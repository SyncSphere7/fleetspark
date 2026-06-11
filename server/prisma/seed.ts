import { PrismaClient, UserRole, VehicleType, VehicleStatus, LoanStatus, Plan, CoverageType, PolicyStatus, PaymentMethod, DefaulterActionType, WalletTransactionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding FleetSpark database...');

  // Clean
  await prisma.walletTransaction.deleteMany();
  await prisma.riderWallet.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.defaulterAction.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.loanProduct.deleteMany();
  await prisma.claim.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.insurancePartner.deleteMany();
  await prisma.incomeCertificate.deleteMany();
  await prisma.incomeVerification.deleteMany();
  await prisma.mobileMoneyStatement.deleteMany();
  await prisma.bankPartner.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.alertSetting.deleteMany();
  await prisma.location.deleteMany();
  await prisma.batteryLog.deleteMany();
  await prisma.chargingSession.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.maintenance.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.telemetryKey.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  const pw = await bcrypt.hash('demo123', 10);

  // ═══ ORG 1: Kiira Motors (Bus Fleet) ═══
  const kiira = await prisma.organization.create({
    data: { name: 'Kiira Motors Corporation', slug: 'kiira-motors', plan: Plan.ENTERPRISE, address: 'Jinja Industrial Park, Jinja, Uganda', phone: '+256414000000', settings: { defaultDieselPrice: 5500, timezone: 'Africa/Kampala' } },
  });
  await prisma.user.create({ data: { orgId: kiira.id, email: 'admin@kiiramotors.com', passwordHash: pw, role: UserRole.ADMIN, name: 'Joseph Kato', phone: '+256772111111' } });
  await prisma.user.create({ data: { orgId: kiira.id, email: 'manager@kiiramotors.com', passwordHash: pw, role: UserRole.FLEET_MANAGER, name: 'Sarah Nakiwala', phone: '+256772222222' } });
  await prisma.user.create({ data: { orgId: kiira.id, email: 'viewer@kiiramotors.com', passwordHash: pw, role: UserRole.VIEWER, name: 'David Okello', phone: '+256772333333' } });

  const kDrivers = await Promise.all([
    prisma.driver.create({ data: { orgId: kiira.id, name: 'John Mugisha', phone: '+256772000001', licenseNumber: 'DL001', nin: 'CF1234567890' } }),
    prisma.driver.create({ data: { orgId: kiira.id, name: 'Peter Otim', phone: '+256772000002', licenseNumber: 'DL002', nin: 'CF1234567891' } }),
    prisma.driver.create({ data: { orgId: kiira.id, name: 'Grace Apio', phone: '+256772000003', licenseNumber: 'DL003', nin: 'CF1234567892' } }),
    prisma.driver.create({ data: { orgId: kiira.id, name: 'Robert Emong', phone: '+256772000004', licenseNumber: 'DL004', nin: 'CF1234567893' } }),
    prisma.driver.create({ data: { orgId: kiira.id, name: 'Mary Akello', phone: '+256772000005', licenseNumber: 'DL005', nin: 'CF1234567894' } }),
  ]);

  for (let i = 0; i < 6; i++) {
    await prisma.vehicle.create({
      data: { orgId: kiira.id, driverId: kDrivers[i % 5].id, name: `Kayoola-00${i + 1}`, plateNumber: `UAX 00${i + 1}A`, model: 'Kayoola EVS', year: 2025, type: VehicleType.BUS, status: i % 3 === 0 ? VehicleStatus.CHARGING : VehicleStatus.IN_TRANSIT, batteryCapacity: 250, maxRangeKm: 300, odometerKm: 5000 + i * 3000, depot: 'Kampala Central', deviceId: `teltonika-kayoola-00${i + 1}` },
    });
  }

  for (const type of ['LOW_BATTERY', 'OFFLINE', 'MAINTENANCE_DUE', 'GEOFENCE_EXIT', 'HIGH_TEMPERATURE', 'RAPID_BATTERY_DROP']) {
    await prisma.alertSetting.create({ data: { orgId: kiira.id, alertType: type, threshold: type === 'LOW_BATTERY' ? { level_pct: 20 } : {}, enabled: true } });
  }
  await prisma.telemetryKey.create({ data: { orgId: kiira.id, name: 'Kiira Fleet', apiKeyHash: await bcrypt.hash('kiira_telemetry_2026', 10) } });
  console.log('✅ Kiira Motors seeded');

  // ═══ ORG 2: Zembo Bikes (Bike Fleet + Financing + Insurance) ═══
  const zembo = await prisma.organization.create({
    data: { name: 'Zembo Electric Bikes', slug: 'zembo-bikes', plan: Plan.GROWTH, address: 'Kampala, Uganda', phone: '+256782000000', settings: { timezone: 'Africa/Kampala' } },
  });
  await prisma.user.create({ data: { orgId: zembo.id, email: 'admin@zembo.ug', passwordHash: pw, role: UserRole.ADMIN, name: 'Moses Kizito', phone: '+256782111111' } });
  await prisma.user.create({ data: { orgId: zembo.id, email: 'manager@zembo.ug', passwordHash: pw, role: UserRole.FLEET_MANAGER, name: 'Grace Namukasa', phone: '+256782222222' } });
  await prisma.user.create({ data: { orgId: zembo.id, email: 'rider@zembo.ug', passwordHash: pw, role: UserRole.DRIVER, name: 'James Wasswa', phone: '+256782333333' } });
  await prisma.user.create({ data: { orgId: zembo.id, email: 'viewer@zembo.ug', passwordHash: pw, role: UserRole.VIEWER, name: 'Patricia Nakamya', phone: '+256782444444' } });

  const zRiders = await Promise.all([
    prisma.driver.create({ data: { orgId: zembo.id, name: 'James Wasswa', phone: '+256782000001', nin: 'CF9876543210' } }),
    prisma.driver.create({ data: { orgId: zembo.id, name: 'Samuel Okello', phone: '+256782000002', nin: 'CF9876543211' } }),
    prisma.driver.create({ data: { orgId: zembo.id, name: 'David Ssemanda', phone: '+256782000003', nin: 'CF9876543212' } }),
    prisma.driver.create({ data: { orgId: zembo.id, name: 'Patrick Mugabi', phone: '+256782000004', nin: 'CF9876543213' } }),
    prisma.driver.create({ data: { orgId: zembo.id, name: 'Andrew Kasozi', phone: '+256782000005', nin: 'CF9876543214' } }),
    prisma.driver.create({ data: { orgId: zembo.id, name: 'Brian Kiwanuka', phone: '+256782000006', nin: 'CF9876543215' } }),
    prisma.driver.create({ data: { orgId: zembo.id, name: 'Charles Lwanga', phone: '+256782000007', nin: 'CF9876543216' } }),
  ]);

  const statuses = [VehicleStatus.IN_TRANSIT, VehicleStatus.CHARGING, VehicleStatus.IDLE, VehicleStatus.IN_TRANSIT, VehicleStatus.IN_TRANSIT, VehicleStatus.IDLE, VehicleStatus.IN_TRANSIT];
  for (let i = 0; i < 7; i++) {
    await prisma.vehicle.create({
      data: { orgId: zembo.id, driverId: zRiders[i].id, name: `Zembo-00${i + 1}`, plateNumber: `UAX 10${i + 1}B`, model: 'Zembo Thunder', year: 2025, type: VehicleType.BIKE, status: statuses[i], batteryCapacity: 2.5, maxRangeKm: 80, odometerKm: 1000 + i * 2000, depot: 'Kampala Central', deviceId: `teltonika-zembo-00${i + 1}` },
    });
  }

  // Loan Products
  const lp1 = await prisma.loanProduct.create({ data: { orgId: zembo.id, name: 'E-Boda Standard 24mo', vehicleType: VehicleType.BIKE, bikePriceUgx: 4350000, minDepositUgx: 600000, interestRatePct: 38, termWeeks: 104, weeklyPaymentUgx: 69109, totalCostUgx: 7779336, isActive: true } });
  const lp2 = await prisma.loanProduct.create({ data: { orgId: zembo.id, name: 'E-Boda Flexi 30mo', vehicleType: VehicleType.BIKE, bikePriceUgx: 4850000, minDepositUgx: 600000, interestRatePct: 42, termWeeks: 130, weeklyPaymentUgx: 57924, totalCostUgx: 8130120, isActive: true } });

  // Loans for first 5 riders
  const vehicles = await prisma.vehicle.findMany({ where: { orgId: zembo.id }, orderBy: { createdAt: 'asc' } });
  for (let i = 0; i < 5; i++) {
    const loan = await prisma.loan.create({
      data: {
        orgId: zembo.id, loanProductId: lp1.id, riderId: zRiders[i].id, vehicleId: vehicles[i].id,
        guarantorName: `Guarantor ${i + 1}`, guarantorPhone: `+25678299999${i}`, guarantorNin: `CF111111111${i}`, guarantorRelation: 'Brother',
        bikePriceUgx: 4350000, depositUgx: 600000, amountFinancedUgx: 3750000, interestRatePct: 38, termWeeks: 104, weeklyPaymentUgx: 69109, totalRepayableUgx: 7187336,
        status: i === 3 ? LoanStatus.DEFAULTED : LoanStatus.ACTIVE,
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        expectedEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        totalPaidUgx: i === 3 ? 1500000 : 3500000 + i * 500000,
        remainingBalance: i === 3 ? 5687336 : 3687336 - i * 500000,
        arrearsUgx: i === 3 ? 207327 : 0,
        weeksOverdue: i === 3 ? 3 : 0,
        nextPaymentDue: new Date(Date.now() + (i === 3 ? -21 : 7) * 24 * 60 * 60 * 1000),
        gpsImmobilized: i === 3,
        gpsImmobilizedAt: i === 3 ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : null,
      },
    });

    // Payments
    const numPaid = i === 3 ? 22 : 50 + i * 5;
    for (let w = 0; w < numPaid; w++) {
      await prisma.payment.create({
        data: { loanId: loan.id, amountUgx: 69109, paymentMethod: PaymentMethod.MOBILE_MONEY, weekNumber: w + 1, dueDate: new Date(Date.now() - (numPaid - w) * 7 * 24 * 60 * 60 * 1000), paidAt: new Date(Date.now() - (numPaid - w) * 7 * 24 * 60 * 60 * 1000), status: 'COMPLETED' as any, channel: 'MTN_MOMO' },
      });
    }

    // Defaulter actions for rider 3 (defaulted)
    if (i === 3) {
      for (const [idx, type] of [DefaulterActionType.SMS_REMINDER, DefaulterActionType.SMS_WARNING, DefaulterActionType.PHONE_CALL, DefaulterActionType.FINAL_NOTICE, DefaulterActionType.GPS_LOCK].entries()) {
        await prisma.defaulterAction.create({ data: { loanId: loan.id, actionType: type, daysOverdue: (idx + 1) * 7, message: `Action: ${type}`, sentTo: zRiders[i].phone, sentBy: 'SYSTEM' } });
      }
    }

    // Wallet
    const wallet = await prisma.riderWallet.create({ data: { riderId: zRiders[i].id, loanId: loan.id, balanceUgx: i === 3 ? 50000 : 150000 + i * 50000, totalEarnedUgx: 2000000 + i * 500000, totalPaidUgx: 69109 * numPaid } });
    await prisma.walletTransaction.create({ data: { walletId: wallet.id, amountUgx: 50000, type: WalletTransactionType.EARNING, description: 'Daily earnings' } });
    await prisma.walletTransaction.create({ data: { walletId: wallet.id, amountUgx: -69109, type: WalletTransactionType.LOAN_DEDUCTION, description: 'Weekly loan payment' } });
  }

  // Insurance Partners
  const jubilee = await prisma.insurancePartner.create({ data: { orgId: zembo.id, name: 'Jubilee Insurance Uganda', contactPhone: '+256414000000', contactEmail: 'info@jubilee.co.ug', isActive: true } });
  const apa = await prisma.insurancePartner.create({ data: { orgId: zembo.id, name: 'APA Insurance Uganda', contactPhone: '+256312000000', contactEmail: 'info@apainsurance.org', isActive: true } });

  // Policies for first 3 bikes
  for (let i = 0; i < 3; i++) {
    await prisma.policy.create({
      data: { orgId: zembo.id, partnerId: i % 2 === 0 ? jubilee.id : apa.id, vehicleId: vehicles[i].id, loanId: (await prisma.loan.findFirst({ where: { vehicleId: vehicles[i].id } }))?.id, coverageType: i === 0 ? CoverageType.COMPREHENSIVE : CoverageType.THIRD_PARTY, policyNumber: `POL-2025-${1000 + i}`, premiumUgx: i === 0 ? 250000 : 120000, startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), endDate: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000), status: PolicyStatus.ACTIVE },
    });
  }

  // Bank Partners
  const stanbic = await prisma.bankPartner.create({ data: { orgId: zembo.id, name: 'Stanbic Bank Uganda', contactEmail: 'digital@stanbic.co.ug', isActive: true } });
  await prisma.bankPartner.create({ data: { orgId: zembo.id, name: 'DFCU Bank', contactEmail: 'fintech@dfcugroup.com', isActive: true } });

  // Income verification for first 2 riders
  for (let i = 0; i < 2; i++) {
    const stmt = await prisma.mobileMoneyStatement.create({ data: { riderId: zRiders[i].id, provider: 'MTN', phoneNumber: zRiders[i].phone, statement_period: 'Last 6 months', rawData: { transactions: [] } } });
    const ver = await prisma.incomeVerification.create({ data: { riderId: zRiders[i].id, statementId: stmt.id, avgDailyIncomeUgx: 45000 + i * 15000, incomeScore: 75 + i * 10, consistencyPct: 85 + i * 5, trend: 'increasing', totalInflowsUgx: 8100000 + i * 2700000, totalOutflowsUgx: 5400000 + i * 1800000, activeDays: 160 + i * 20, totalDays: 180 } });
    await prisma.incomeCertificate.create({ data: { orgId: zembo.id, verificationId: ver.id, riderId: zRiders[i].id, bankPartnerId: stanbic.id, incomeScore: ver.incomeScore, avgDailyIncomeUgx: ver.avgDailyIncomeUgx, validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) } });
  }

  // Alerts
  await prisma.alert.create({ data: { orgId: zembo.id, vehicleId: vehicles[1].id, type: 'LOW_BATTERY', severity: 'WARNING', message: 'Zembo-002 battery at 18%', isAcknowledged: false } });
  await prisma.alert.create({ data: { orgId: zembo.id, vehicleId: vehicles[2].id, type: 'OFFLINE', severity: 'CRITICAL', message: 'Zembo-003 offline for 45 minutes', isAcknowledged: false } });
  await prisma.alert.create({ data: { orgId: kiira.id, vehicleId: (await prisma.vehicle.findFirst({ where: { orgId: kiira.id } }))!.id, type: 'MAINTENANCE_DUE', severity: 'INFO', message: 'Kayoola-001 maintenance due in 7 days', isAcknowledged: false } });

  console.log('✅ Zembo Bikes seeded');
  console.log('');
  console.log('═══ SAMPLE LOGINS ═══');
  console.log('');
  console.log('Organization: Kiira Motors (Bus Fleet)');
  console.log('  Admin:    admin@kiiramotors.com    / demo123');
  console.log('  Manager:  manager@kiiramotors.com  / demo123');
  console.log('  Viewer:   viewer@kiiramotors.com   / demo123');
  console.log('');
  console.log('Organization: Zembo Bikes (Bike Fleet + Financing + Charging)');
  console.log('  Admin:    admin@zembo.ug            / demo123');
  console.log('  Manager:  manager@zembo.ug          / demo123');
  console.log('  Rider:    rider@zembo.ug            / demo123');
  console.log('  Viewer:   viewer@zembo.ug           / demo123');
  console.log('');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
