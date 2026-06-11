import { Router, Response } from 'express';
import { PrismaClient, PaymentMethod, DefaulterActionType } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/loans
router.get('/', async (req: AuthRequest, res: Response) => {
  const { status, riderId, overdue } = req.query;
  const where: any = { orgId: req.orgId! };
  if (status) where.status = status;
  if (riderId) where.riderId = riderId;
  if (overdue === 'true') { where.weeksOverdue = { gt: 0 }; where.status = 'ACTIVE'; }
  const loans = await prisma.loan.findMany({ where, include: { rider: { select: { name: true, phone: true } }, vehicle: { select: { name: true, plateNumber: true } } }, orderBy: { createdAt: 'desc' } });
  res.json({ data: loans, meta: { total: loans.length } });
});

// POST /api/v1/loans
router.post('/', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const { loanProductId, riderId, vehicleId, guarantorName, guarantorPhone, guarantorNin, guarantorRelation } = req.body;
  const product = await prisma.loanProduct.findUnique({ where: { id: loanProductId } });
  if (!product) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Loan product not found' } });
  const loan = await prisma.loan.create({ data: { orgId: req.orgId!, loanProductId, riderId, vehicleId, guarantorName, guarantorPhone, guarantorNin, guarantorRelation, bikePriceUgx: product.bikePriceUgx, depositUgx: product.minDepositUgx, amountFinancedUgx: product.bikePriceUgx - product.minDepositUgx, interestRatePct: product.interestRatePct, termWeeks: product.termWeeks, weeklyPaymentUgx: product.weeklyPaymentUgx, totalRepayableUgx: product.totalCostUgx, startDate: new Date(), expectedEndDate: new Date(Date.now() + product.termWeeks * 7 * 24 * 60 * 60 * 1000), remainingBalance: product.totalCostUgx - product.minDepositUgx, nextPaymentDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
  // Create wallet
  await prisma.riderWallet.create({ data: { riderId, loanId: loan.id, balanceUgx: 0, totalEarnedUgx: 0, totalPaidUgx: product.minDepositUgx } });
  res.status(201).json(loan);
});

// GET /api/v1/loans/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  const loan = await prisma.loan.findFirst({ where: { id: req.params.id, orgId: req.orgId! }, include: { rider: true, vehicle: true, payments: { orderBy: { weekNumber: 'asc' } }, defaulterActions: { orderBy: { actionDate: 'desc' } } } });
  if (!loan) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Loan not found' } });
  res.json(loan);
});

// POST /api/v1/loans/:id/immobilize
router.post('/:id/immobilize', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const loan = await prisma.loan.update({ where: { id: req.params.id }, data: { gpsImmobilized: true, gpsImmobilizedAt: new Date() } });
  await prisma.defaulterAction.create({ data: { loanId: loan.id, actionType: DefaulterActionType.GPS_LOCK, daysOverdue: loan.weeksOverdue * 7, message: 'GPS immobilization activated', sentTo: loan.riderId, sentBy: req.user!.id } });
  res.json(loan);
});

// POST /api/v1/loans/:id/unimmobilize
router.post('/:id/unimmobilize', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const loan = await prisma.loan.update({ where: { id: req.params.id }, data: { gpsImmobilized: false } });
  await prisma.defaulterAction.create({ data: { loanId: loan.id, actionType: DefaulterActionType.GPS_UNLOCK, daysOverdue: 0, message: 'GPS unlock activated', sentTo: loan.riderId, sentBy: req.user!.id } });
  res.json(loan);
});

export { router as loansRouter };
