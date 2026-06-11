import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware } from '../middleware/auth';
const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// GET /api/v1/reports/fleet-summary
router.get('/fleet-summary', async (req: AuthRequest, res: Response) => {
  const { from, to } = req.query;
  const dateFilter = from || to ? { gte: from ? new Date(from as string) : undefined, lte: to ? new Date(to as string) : undefined } : undefined;
  const orgId = req.orgId!;
  const [totalVehicles, activeVehicles, chargingVehicles, maintenanceVehicles, totalTrips, totalDistance, totalAlerts, activeLoans, totalLoanPortfolio] = await Promise.all([
    prisma.vehicle.count({ where: { orgId, isActive: true } }),
    prisma.vehicle.count({ where: { orgId, status: 'IN_TRANSIT', isActive: true } }),
    prisma.vehicle.count({ where: { orgId, status: 'CHARGING', isActive: true } }),
    prisma.vehicle.count({ where: { orgId, status: 'MAINTENANCE', isActive: true } }),
    dateFilter ? prisma.trip.count({ where: { vehicle: { orgId }, startTime: dateFilter } }) : prisma.trip.count({ where: { vehicle: { orgId } } }),
    prisma.trip.aggregate({ where: { vehicle: { orgId } }, _sum: { distanceKm: true } }),
    prisma.alert.count({ where: { orgId, isAcknowledged: false } }),
    prisma.loan.count({ where: { orgId, status: 'ACTIVE' } }),
    prisma.loan.aggregate({ where: { orgId, status: 'ACTIVE' }, _sum: { remainingBalance: true } }),
  ]);
  const dieselPrice = 5500;
  const emissionFactor = 2.68;
  const totalKm = totalDistance._sum.distanceKm || 0;
  const fuelSavedLiters = totalKm / 12; // Assuming 12 km/liter for diesel bus
  const costSavedUgx = Math.round(fuelSavedLiters * dieselPrice);
  const co2SavedKg = Math.round(fuelSavedLiters * emissionFactor);
  res.json({ fleet: { totalVehicles, activeNow: activeVehicles, chargingNow: chargingVehicles, inMaintenance: maintenanceVehicles, totalTrips, totalDistanceKm: totalKm, pendingAlerts: totalAlerts }, financing: { activeLoans, totalPortfolioUgx: totalLoanPortfolio._sum.remainingBalance || 0 }, savings: { fuelLitersSaved: Math.round(fuelSavedLiters), costSavedUgx, co2KgSaved: co2SavedKg } });
});

export { router as reportsRouter };
