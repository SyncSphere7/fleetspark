import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, UserRole } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fleetspark_secret_change_me';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fleetspark_refresh_change_me';

export interface AuthRequest extends Request {
  user?: User;
  orgId?: string;
}

export function generateTokens(user: User) {
  const accessToken = jwt.sign(
    { userId: user.id, orgId: user.orgId, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken, expiresIn: 900 };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' } });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; orgId: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'User not found or inactive' } });
    }
    req.user = user;
    req.orgId = user.orgId;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } });
  }
}

export function requireRole(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
    }
    next();
  };
}

// Drivers can only access their own data
export function requireOwnership(paramField = 'driverId') {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'DRIVER' && req.params[paramField] !== req.user.id) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Access denied' } });
    }
    next();
  };
}
