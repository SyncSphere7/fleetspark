import { Router, Response } from 'express';
import { PrismaClient, CoverageType, PolicyStatus } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/policies
router.get('/', async (req: AuthRequest, res: Response) => {
  const { status, vehicleId } = req.query;
  const where: any = { orgId: req.orgId! };
  if (status) where.status = status;
  if (vehicleId) where.vehicleId = vehicleId;
  const policies = await prisma.policy.findMany({ where, include: { partner: { select: { name: true } }, vehicle: { select: { name: true, plateNumber: true } }, loan: { select: { rider: { select: { name: true } } } } }, orderBy: { createdAt: 'desc' } });
  res.json({ data: policies, meta: { total: policies.length } });
});

// POST /api/v1/policies
router.post('/', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const { partnerId, vehicleId, loanId, coverageType, policyNumber, premiumUgx, startDate, endDate } = req.body;
  const policy = await prisma.policy.create({ data: { orgId: req.orgId!, partnerId, vehicleId, loanId, coverageType: coverageType || CoverageType.THIRD_PARTY, policyNumber, premiumUgx, startDate: new Date(startDate), endDate: new Date(endDate), status: PolicyStatus.ACTIVE } });
  res.status(201).json(policy);
});

// GET /api/v1/policies/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  const policy = await prisma.policy.findFirst({ where: { id: req.params.id, orgId: req.orgId! }, include: { partner: true, vehicle: true, claims: true } });
  if (!policy) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Policy not found' } });
  res.json(policy);
});

// POST /api/v1/policies/:id/claims
router.post('/:id/claims', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const claim = await prisma.claim.create({ data: { policyId: req.params.id, incidentDate: new Date(req.body.incidentDate), description: req.body.description, amountClaimedUgx: req.body.amountClaimedUgx } });
  res.status(201).json(claim);
});

// GET /api/v1/policies/partners
router.get('/partners/list', async (req: AuthRequest, res: Response) => {
  const partners = await prisma.insurancePartner.findMany({ where: { orgId: req.orgId!, isActive: true } });
  res.json(partners);
});

// POST /api/v1/policies/partners
router.post('/partners', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  const partner = await prisma.insurancePartner.create({ data: { orgId: req.orgId!, name: req.body.name, contactPhone: req.body.contactPhone, contactEmail: req.body.contactEmail } });
  res.status(201).json(partner);
});

// GET /api/v1/policies/premium/calculate
router.get('/premium/calculate', async (req: AuthRequest, res: Response) => {
  const { bikeValue, coverageType, riderAge } = req.query;
  const value = parseFloat(bikeValue as string) || 4000000;
  const age = parseInt(riderAge as string) || 30;
  const baseRate = coverageType === 'COMPREHENSIVE' ? 0.05 : coverageType === 'THIRD_PARTY_FIRE_THEFT' ? 0.03 : 0.02;
  const ageMultiplier = age < 25 ? 1.3 : age > 50 ? 1.2 : 1.0;
  const premium = Math.round(value * baseRate * ageMultiplier);
  res.json({ bikeValue: value, coverageType: coverageType || 'THIRD_PARTY', estimatedPremiumUgx: premium, currency: 'UGX' });
});

export { router as policiesRouter };
