import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);
  if (err.name === 'ZodError') {
    return res.status(422).json({ error: { code: 'VALIDATION_ERROR', message: 'Request validation failed', details: err.errors } });
  }
  if (err.code === 'P2002') {
    return res.status(409).json({ error: { code: 'CONFLICT', message: 'Unique constraint violation' } });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Record not found' } });
  }
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message } });
}
