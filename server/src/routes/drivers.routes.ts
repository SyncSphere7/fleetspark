import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/drivers
router.get('/', async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '25', search } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const where: any = { orgId: req.orgId!, isActive: true };
  if (search) where.OR = [{ name: { contains: search as string, mode: 'insensitive' } }, { phone: { contains: search as string } }];
  const [drivers, total] = await Promise.all([prisma.driver.findMany({ where, skip, take: parseInt(limit as string), orderBy: { name: 'asc' } }), prisma.driver.count({ where })]);
  res.json({ data: drivers, meta: { total, page: parseInt(page as string), limit: parseInt(limit as string), totalPages: Math.ceil(total / parseInt(limit as string)) } });
});

// POST /api/v1/drivers
router.post('/', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const driver = await prisma.driver.create({ data: { orgId: req.orgId!, ...req.body } });
  res.status(201).json(driver);
});

// GET /api/v1/drivers/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  const driver = await prisma.driver.findFirst({ where: { id: req.params.id, orgId: req.orgId! }, include: { vehicles: true, wallet: true } });
  if (!driver) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Driver not found' } });
  res.json(driver);
});

// PUT /api/v1/drivers/:id
router.put('/:id', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const driver = await prisma.driver.update({ where: { id: req.params.id }, data: req.body });
  res.json(driver);
});

// DELETE /api/v1/drivers/:id
router.delete('/:id', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  await prisma.driver.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.status(204).send();
});

export { router as driversRouter };
