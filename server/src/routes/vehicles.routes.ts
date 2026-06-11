import { Router, Response } from 'express';
import { PrismaClient, VehicleStatus } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.use(authMiddleware);

// GET /api/v1/vehicles
router.get('/', async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '25', status, type, search } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);
  const where: any = { orgId: req.orgId!, isActive: true };
  if (status) where.status = status;
  if (type) where.type = type;
  if (search) where.OR = [{ name: { contains: search as string, mode: 'insensitive' } }, { plateNumber: { contains: search as string, mode: 'insensitive' } }];
  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({ where, skip, take, include: { driver: { select: { id: true, name: true, phone: true } } }, orderBy: { updatedAt: 'desc' } }),
    prisma.vehicle.count({ where }),
  ]);
  const data = vehicles.map(v => ({
    id: v.id, name: v.name, plateNumber: v.plateNumber, model: v.model, type: v.type, status: v.status,
    batteryCapacity: v.batteryCapacity, maxRangeKm: v.maxRangeKm, odometerKm: v.odometerKm, depot: v.depot,
    driver: v.driver, createdAt: v.createdAt, updatedAt: v.updatedAt,
  }));
  res.json({ data, meta: { total, page: parseInt(page as string), limit: take, totalPages: Math.ceil(total / take) } });
});

// POST /api/v1/vehicles
router.post('/', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const { name, plateNumber, vin, model, year, type, batteryCapacity, maxRangeKm, odometerKm, depot, deviceId, driverId } = req.body;
  const vehicle = await prisma.vehicle.create({ data: { orgId: req.orgId!, name, plateNumber, vin, model, year: year || 2025, type: type || 'CAR', status: 'IDLE', batteryCapacity, maxRangeKm, odometerKm: odometerKm || 0, depot, deviceId, driverId } });
  res.status(201).json(vehicle);
});

// GET /api/v1/vehicles/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  const vehicle = await prisma.vehicle.findFirst({ where: { id: req.params.id, orgId: req.orgId! }, include: { driver: true } });
  if (!vehicle) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Vehicle not found' } });
  res.json(vehicle);
});

// PUT /api/v1/vehicles/:id
router.put('/:id', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const vehicle = await prisma.vehicle.update({ where: { id: req.params.id }, data: req.body });
  res.json(vehicle);
});

// DELETE /api/v1/vehicles/:id (soft delete)
router.delete('/:id', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  await prisma.vehicle.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.status(204).send();
});

// POST /api/v1/vehicles/:id/status
router.post('/:id/status', requireRole('ADMIN', 'FLEET_MANAGER', 'DRIVER'), async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const vehicle = await prisma.vehicle.update({ where: { id: req.params.id }, data: { status } });
  const io = req.app.get('io');
  if (io) { io.to(`org:${req.orgId}`).emit('vehicle:status', { vehicleId: vehicle.id, status: vehicle.status, timestamp: new Date() }); }
  res.json(vehicle);
});

export { router as vehiclesRouter };
