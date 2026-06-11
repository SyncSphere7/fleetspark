import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

router.get('/organization', async (req: AuthRequest, res: Response) => {
  const org = await prisma.organization.findUnique({ where: { id: req.orgId! } });
  res.json(org);
});

router.put('/organization', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  const org = await prisma.organization.update({ where: { id: req.orgId! }, data: req.body });
  res.json(org);
});

export { router as settingsRouter };
