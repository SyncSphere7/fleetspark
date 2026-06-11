import { Router, Response } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import { AuthRequest, authMiddleware, requireRole } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res: Response) => {
  const users = await prisma.user.findMany({ where: { orgId: req.orgId! }, orderBy: { createdAt: 'desc' } });
  res.json({ data: users, meta: { total: users.length } });
});

router.post('/invite', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  const { email, name, role } = req.body;
  const pw = require('bcryptjs').hashSync('demo123', 10);
  const user = await prisma.user.create({ data: { orgId: req.orgId!, email, name, passwordHash: pw, role: role || 'VIEWER' } });
  res.status(201).json(user);
});

router.put('/:id/role', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { role: req.body.role } });
  res.json(user);
});

router.delete('/:id', requireRole('ADMIN'), async (req: AuthRequest, res: Response) => {
  await prisma.user.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.status(204).send();
});

export { router as usersRouter };
