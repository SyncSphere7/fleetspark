import { Router, Response } from 'express';
import { PrismaClient, PaymentMethod } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/payments
router.get('/', async (req: AuthRequest, res: Response) => {
  const { loanId, from, to } = req.query;
  const where: any = { loan: { orgId: req.orgId! } };
  if (loanId) where.loanId = loanId;
  if (from || to) where.paidAt = { gte: from ? new Date(from as string) : undefined, lte: to ? new Date(to as string) : undefined };
  const payments = await prisma.payment.findMany({ where, include: { loan: { include: { rider: { select: { name: true } } } } }, orderBy: { paidAt: 'desc' }, take: 100 });
  res.json({ data: payments, meta: { total: payments.length } });
});

// POST /api/v1/payments
router.post('/', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const { loanId, amountUgx, paymentMethod, channel, transactionId, weekNumber } = req.body;
  const payment = await prisma.payment.create({ data: { loanId, amountUgx, paymentMethod: paymentMethod || PaymentMethod.MOBILE_MONEY, channel, transactionId, weekNumber: weekNumber || 1, dueDate: new Date(), paidAt: new Date() } });
  // Update loan balance
  const loan = await prisma.loan.findUnique({ where: { id: loanId } });
  if (loan) {
    const newPaid = loan.totalPaidUgx + amountUgx;
    const newBalance = loan.totalRepayableUgx - newPaid;
    await prisma.loan.update({ where: { id: loanId }, data: { totalPaidUgx: newPaid, remainingBalance: Math.max(0, newBalance), lastPaymentDate: new Date(), arrearsUgx: Math.max(0, loan.arrearsUgx - amountUgx), weeksOverdue: newBalance <= 0 ? 0 : loan.weeksOverdue } });
  }
  res.status(201).json(payment);
});

// GET /api/v1/payments/overdue
router.get('/overdue', async (req: AuthRequest, res: Response) => {
  const loans = await prisma.loan.findMany({ where: { orgId: req.orgId!, status: 'ACTIVE', weeksOverdue: { gt: 0 } }, include: { rider: { select: { name: true, phone: true } }, vehicle: { select: { name: true, plateNumber: true } } } });
  res.json({ data: loans, meta: { total: loans.length } });
});

export { router as paymentsRouter };
