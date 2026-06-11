import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateTokens, AuthRequest, authMiddleware } from './auth';

const prisma = new PrismaClient();
const router = Router();

// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { orgName, orgSlug, userName, email, password } = req.body;
    if (!orgName || !userName || !email || !password) {
      return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: { code: 'CONFLICT', message: 'Email already registered' } });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const slug = orgSlug || orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const org = await prisma.organization.create({ data: { name: orgName, slug } });
    const user = await prisma.user.create({
      data: { orgId: org.id, email, passwordHash, role: 'ADMIN', name: userName },
    });
    const tokens = generateTokens(user);
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, orgId: user.orgId }, tokens });
  } catch (e: any) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: e.message } });
  }
});

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: 'Email and password required' } });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
    }
    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
    const tokens = generateTokens(user);
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, orgId: user.orgId }, tokens });
  } catch (e: any) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: e.message } });
  }
});

// POST /auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Refresh token required' } });
    }
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fleetspark_refresh_change_me') as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'User not found' } });
    }
    const tokens = generateTokens(user);
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, orgId: user.orgId }, tokens });
  } catch {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid refresh token' } });
  }
});

// GET /auth/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  res.json({ user: { id: req.user!.id, email: req.user!.email, name: req.user!.name, role: req.user!.role, orgId: req.user!.orgId } });
});

export { router as authRouter };
