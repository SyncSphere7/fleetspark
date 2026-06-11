import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/trips
router.get('/', async (req: AuthRequest, res: Response) => {
  const { vehicleId, driverId, from, to } = req.query;
  const where: any = { vehicle: { orgId: req.orgId! } };
  if (vehicleId) where.vehicleId = vehicleId;
  if (driverId) where.driverId = driverId;
  if (from || to) where.startTime = { gte: from ? new Date(from as string) : undefined, lte: to ? new Date(to as string) : undefined };
  const trips = await prisma.trip.findMany({ where, include: { vehicle: { select: { name: true, plateNumber: true } }, driver: { select: { name: true } } }, orderBy: { startTime: 'desc' }, take: 100 });
  res.json({ data: trips, meta: { total: trips.length } });
});

// GET /api/v1/trips/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  const trip = await prisma.trip.findFirst({ where: { id: req.params.id, vehicle: { orgId: req.orgId! } }, include: { vehicle: true, driver: true } });
  if (!trip) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Trip not found' } });
  res.json(trip);
});

export { router as tripsRouter };
