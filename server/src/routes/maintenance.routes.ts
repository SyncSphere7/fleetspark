import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/maintenance
router.get('/', async (req: AuthRequest, res: Response) => {
  const { vehicleId, status } = req.query;
  const where: any = { vehicle: { orgId: req.orgId! } };
  if (vehicleId) where.vehicleId = vehicleId;
  if (status) where.status = status;
  const items = await prisma.maintenance.findMany({ where, include: { vehicle: { select: { name: true, plateNumber: true } } }, orderBy: { scheduledDate: 'asc' } });
  res.json({ data: items, meta: { total: items.length } });
});

// POST /api/v1/maintenance
router.post('/', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const item = await prisma.maintenance.create({ data: { vehicleId: req.body.vehicleId, type: req.body.type, description: req.body.description, scheduledDate: new Date(req.body.scheduledDate), odometerKm: req.body.odometerKm, notes: req.body.notes } });
  res.status(201).json(item);
});

// POST /api/v1/maintenance/:id/complete
router.post('/:id/complete', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const item = await prisma.maintenance.update({ where: { id: req.params.id }, data: { status: 'COMPLETED', completedDate: new Date(), costUgx: req.body.costUgx, notes: req.body.notes } });
  res.json(item);
});

export { router as maintenanceRouter };
