import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import pino from 'pino';

import { authRouter } from './routes/auth.routes';
import { vehiclesRouter } from './routes/vehicles.routes';
import { driversRouter } from './routes/drivers.routes';
import { alertsRouter } from './routes/alerts.routes';
import { tripsRouter } from './routes/trips.routes';
import { maintenanceRouter } from './routes/maintenance.routes';
import { loansRouter } from './routes/loans.routes';
import { paymentsRouter } from './routes/payments.routes';
import { policiesRouter } from './routes/policies.routes';
import { reportsRouter } from './routes/reports.routes';
import { usersRouter } from './routes/users.routes';
import { settingsRouter } from './routes/settings.routes';
import { errorHandler } from './middleware/errorHandler';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: { origin: process.env.CLIENT_URL || '*', methods: ['GET', 'POST'] },
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// API Routes
app.use('/auth', authRouter);
app.use('/api/v1/vehicles', vehiclesRouter);
app.use('/api/v1/drivers', driversRouter);
app.use('/api/v1/alerts', alertsRouter);
app.use('/api/v1/trips', tripsRouter);
app.use('/api/v1/maintenance', maintenanceRouter);
app.use('/api/v1/loans', loansRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/policies', policiesRouter);
app.use('/api/v1/reports', reportsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/settings', settingsRouter);

// Error handler
app.use(errorHandler);

// WebSocket
io.on('connection', (socket) => {
  logger.info(`WS connected: ${socket.id}`);
  socket.on('subscribe:fleet', (orgId: string) => socket.join(`org:${orgId}`));
  socket.on('subscribe:vehicle', (vehicleId: string) => socket.join(`vehicle:${vehicleId}`));
  socket.on('disconnect', () => logger.info(`WS disconnected: ${socket.id}`));
});

// Make io accessible to routes
app.set('io', io);

const PORT = parseInt(process.env.PORT || '3000', 10);
httpServer.listen(PORT, '0.0.0.0', () => {
  logger.info(`🚀 FleetSpark server running on port ${PORT}`);
  logger.info(`📡 WebSocket ready`);
});

export { app, io };
