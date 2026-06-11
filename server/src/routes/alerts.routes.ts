import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/alerts
router.get('/', async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '25', type, severity, acknowledged } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const where: any = { orgId: req.orgId! };
  if (type) where.type = type;
  if (severity) where.severity = severity;
  if (acknowledged !== undefined) where.isAcknowledged = acknowledged === 'true';
  const [alerts, total] = await Promise.all([prisma.alert.findMany({ where, skip, take: parseInt(limit as string), include: { vehicle: { select: { id: true, name: true, plateNumber: true } } }, orderBy: { createdAt: 'desc' } }), prisma.alert.count({ where })]);
  res.json({ data: alerts, meta: { total, page: parseInt(page as string), limit: parseInt(limit as string), totalPages: Math.ceil(total / parseInt(limit as string)) } });
});

// POST /api/v1/alerts/:id/acknowledge
router.post('/:id/acknowledge', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const alert = await prisma.alert.update({ where: { id: req.params.id }, data: { isAcknowledged: true, acknowledgedBy: req.user!.id, acknowledgedAt: new Date() } });
  res.json(alert);
});

// GET /api/v1/alerts/settings
router.get('/settings', async (req: AuthRequest, res: Response) => {
  const settings = await prisma.alertSetting.findMany({ where: { orgId: req.orgId! } });
  res.json(settings);
});

// PUT /api/v1/alerts/settings/:type
router.put('/settings/:type', requireRole('ADMIN', 'FLEET_MANAGER'), async (req: AuthRequest, res: Response) => {
  const setting = await prisma.alertSetting.upsert({ where: { orgId_alert_type: { orgId: req.orgId!, alertType: req.params.type as any } }, create: { orgId: req.orgId!, alertType: req.params.type as any, ...req.body }, update: req.body });
  res.json(setting);
});

export { router as alertsRouter };
