# FleetSpark — Bike Financing & Payment Management Module

**Version:** 1.0  
**Date:** June 11, 2026  
**Author:** SyncSphere CEO  
**Status:** Research-backed specification

---

## 1. Executive Summary

The e-boda financing market in Uganda is growing fast but is plagued by **predatory lending practices, high default rates, and zero consumer protection**. Riders are getting trapped in debt cycles with aggressive repossession, hidden fees, and no grace periods. FleetSpark can solve this by providing a **transparent, technology-driven financing management platform** that protects both the lender (fleet operator/financier) and the rider.

---

## 2. How E-Boda Financing Works in Uganda (Research Findings)

### Current Market Terms

| Provider | Bike Price | Down Payment | Weekly Payment | Term | Total Cost | Effective APR |
|----------|-----------|-------------|----------------|------|------------|--------------|
| **MOGO (Zembo Thunder)** | UGX 4,350,000 | UGX 600,000 | UGX 69,109 | 24 mo (104 wks) | ~UGX 7,779,336 | ~45% |
| **MOGO (Spiro Ekon)** | UGX 4,850,000 | UGX 600,000 | UGX 57,924 | 30 mo (130 wks) | ~UGX 8,130,120 | ~42% |
| **MOGO (Spiro Ekon)** | UGX 4,850,000 | UGX 600,000 | UGX 63,545 | 24 mo (104 wks) | ~UGX 7,208,680 | ~38% |
| **Watu Credit** | ~UGX 3,500,000 | UGX 700,000 | UGX 80,000-120,000 | 18-24 mo | ~UGX 8,000,000+ | ~50%+ |
| **Tugende** | ~UGX 3,000,000 | Varies | Varies | 18-24 mo | Varies | ~40-60% |
| **Spiro Direct** | ~UGX 4,000,000 | UGX 195,000 | Varies | 24 mo | Varies | Varies |

### Key Observations

1. **Down payments range from UGX 195,000 to 700,000** — the "UGX 100,000" Cliff mentioned is likely a promotional or older figure. Current minimum is ~UGX 600,000 for electric bikes.

2. **Effective interest rates are 38-60% APR** — extremely high, but justified by high default risk and operational costs in informal markets.

3. **Weekly payment model** dominates — aligns with boda boda daily earning cycles.

4. **Total cost is 1.5x-2.5x the cash price** — riders pay a massive premium for credit.

5. **No government regulation** — Ministry of Trade says it's "service sector," Ministry of Transport says it's not their jurisdiction. Riders have zero consumer protection.

---

## 3. What Riders Are Complaining About (Research-Backed)

### Top Complaints

| # | Complaint | Frequency | Severity |
|---|-----------|-----------|----------|
| 1 | **Aggressive repossession** — bikes taken after 1-2 missed payments, even near end of loan term | Very High | Critical |
| 2 | **Hidden fees** — storage fees after repossession, discharge fees (UGX 97,000+), "processing fees" | High | Critical |
| 3 | **No grace period** — illness, accident, family emergency = no flexibility | Very High | Critical |
| 4 | **Contract not understood** — English-only contracts, riders speak Luganda, no translation | High | High |
| 5 | **Bike sold after repossession** — even if rider was 90% paid off | Medium | Critical |
| 6 | **Harassment** — lenders send agents to stages, publicly shame defaulters | High | High |
| 7 | **Market saturation** — too many bodas, earnings down, can't meet payments | High | Medium |
| 8 | **Overuse/overwork** — riders overwork bikes to meet payments, premature wear | Medium | Medium |
| 9 | **No insurance** — accident or theft = rider still owes full loan | High | Critical |
| 10 | **Logbook held by lender** — rider can't sell or use bike as collateral elsewhere | Medium | Medium |

### The Defaulter's Story (Typical)
1. Rider misses 1-2 weekly payments (UGX 60,000-120,000)
2. Lender sends agent to boda stage
3. Bike repossessed (often with GPS kill switch or physical seizure)
4. Storage fees accrue (UGX 5,000-10,000/day)
5. Rider given 7-14 days to clear arrears + storage
6. If not paid, bike sold — often for less than outstanding balance
7. Rider still owes the difference (deficiency balance)
8. Rider's guarantor (family member) also liable

---

## 4. How Defaulter Recovery Currently Works

### Technology Used
| Method | How It Works | Used By |
|--------|-------------|---------|
| **GPS Kill Switch** | Remote engine disable via telematics. Bike stops when rider reaches home or a swap station. | MOGO, Watu, Tugende |
| **GPS Tracking** | Real-time location monitoring. Agents know exactly where the bike is. | All major lenders |
| **Physical Repossession** | Agents physically take the bike from the stage or rider's home. | All lenders |
| **Logbook Holding** | Lender holds the bike's logbook. Rider can't sell or transfer. | All lenders |
| **Guarantor System** | Another person (family member) guarantees the loan. Liable if rider defaults. | MOGO, Watu |
| **Stage-Based Collection** | Lenders work with boda stage chairmen to track riders. | All lenders |

### The GPS Kill Switch Flow
```
Rider misses payment
    → Lender sends SMS warning (Day 1-3)
    → If no payment: Remote GPS kill switch activated
    → Bike stops at next swap station or when ignition turned off
    → Rider can't restart
    → Lender's agent collects bike from known location
    → Bike taken to lender's yard
    → Rider given 7-14 days to clear arrears
    → If not paid: bike sold
```

---

## 5. FleetSpark's Solution: Financing Management Module

### Core Philosophy
**Transparency + Flexibility + Technology = Lower defaults, happier riders, better returns**

### Module Components

#### 5.1 Loan Contract Management
- Digital loan contracts with **full terms visible** in the rider's language
- **E-signature** or SMS confirmation (for low-literacy riders)
- Contract stored in system, accessible to rider anytime
- Automatic calculation of: total cost, weekly payment, effective interest rate
- **No hidden fees** — all charges shown upfront

#### 5.2 Payment Tracking
- **Mobile Money integration** (MTN MoMo, Airtel Money) — riders pay via USSD
- **Automatic payment detection** — system matches MoMo payments to rider accounts
- **Payment history** — full ledger per rider
- **Receipt generation** — automatic SMS receipt after each payment
- **Payment reminders** — SMS 1 day before due date

#### 5.3 Flexible Repayment Engine
- **Standard schedule** — weekly payments as contracted
- **Early payment bonus** — small discount for paying early (incentive)
- **Partial payment** — accept partial amounts, reduce arrears
- **Payment rescheduling** — allow 1 rescheduling per quarter (manager approval)
- **Grace period** — configurable (e.g., 7 days) before marking as default
- **Emergency pause** — up to 2 weeks pause for documented emergencies (hospital, accident)

#### 5.4 Defaulter Management (Graduated Response)

| Stage | Days Overdue | Action | Channel |
|-------|-------------|--------|---------|
| **Reminder** | 1-3 days | Friendly SMS reminder | SMS |
| **Warning** | 4-7 days | Formal warning SMS + call | SMS + Phone |
| **Grace offer** | 8-14 days | Offer payment plan adjustment | Phone call |
| **Final notice** | 15-21 days | Final warning before GPS lock | SMS + Phone |
| **GPS lock** | 22-30 days | Remote immobilization | GPS kill switch |
| **Repossession** | 30+ days | Physical repossession | Field agent |
| **Recovery** | Post-repo | Arrears notice, storage fees, sale | Formal letter |

**Key difference from current market:** FleetSpark gives riders **multiple chances** and **clear communication** at every stage. No surprise repossessions.

#### 5.5 GPS Integration for Recovery
- **Real-time tracking** — always know where financed bikes are
- **Geofencing** — alert if bike leaves designated operating area
- **Remote immobilization** — kill switch integration (via Teltonika SECO or similar)
- **Last known location** — if bike is moved without authorization
- **Recovery mode** — when activated, increases location update frequency to every 30 seconds

#### 5.6 Guarantor Management
- Store guarantor details (name, phone, relationship, NIN)
- Automatic SMS to guarantor when rider defaults
- Guarantor payment portal (guarantor can pay on rider's behalf)
- Guarantor liability tracking

#### 5.7 Insurance Integration (Future)
- Partner with insurance companies (APA, Jubilee, UAP)
- Automatic insurance for financed bikes
- Accident/theft = insurance pays off loan
- Rider protected, lender protected

#### 5.8 Reporting & Analytics
- **Portfolio health** — % on-time, % overdue, % defaulted
- **Default rate by cohort** — which month's loans are defaulting most?
- **Rider risk score** — based on payment history, age, location
- **Recovery rate** — % of defaulted bikes recovered
- **Revenue tracking** — interest earned, fees collected, losses from defaults

---

## 6. Database Additions for Financing Module

### New Tables (to add to existing schema)

```prisma
// ─── Loan Products ────────────────────────────────────────────

model LoanProduct {
  id              String       @id @default(uuid())
  orgId           String       @map("org_id")
  name            String       // e.g., "E-Boda Standard 24mo"
  vehicleType     VehicleType  @map("vehicle_type")
  bikePriceUgx    Int          @map("bike_price_ugx")
  minDepositUgx   Int          @map("min_deposit_ugx")
  interestRatePct Float        @map("interest_rate_pct") // Annual
  termWeeks       Int          @map("term_weeks")
  weeklyPaymentUgx Int         @map("weekly_payment_ugx")
  totalCostUgx    Int          @map("total_cost_ugx")
  isActive        Boolean      @default(true) @map("is_active")
  createdAt       DateTime     @default(now()) @map("created_at")
  updatedAt       DateTime     @updatedAt @map("updated_at")

  organization    Organization @relation(fields: [orgId], references: [id], onDelete: Cascade)
  loans           Loan[]

  @@map("loan_products")
}

// ─── Loans ─────────────────────────────────────────────────────

model Loan {
  id                String       @id @default(uuid())
  orgId             String       @map("org_id")
  loanProductId     String       @map("loan_product_id")
  riderId           String       @map("rider_id")  // References drivers table
  vehicleId         String       @map("vehicle_id") // References vehicles table
  guarantorName     String?      @map("guarantor_name")
  guarantorPhone    String?      @map("guarantor_phone")
  guarantorNin      String?      @map("guarantor_nin")
  guarantorRelation String?      @map("guarantor_relation")

  // Loan terms
  bikePriceUgx      Int          @map("bike_price_ugx")
  depositUgx        Int          @map("deposit_ugx")
  amountFinancedUgx Int          @map("amount_financed_ugx")
  interestRatePct   Float        @map("interest_rate_pct")
  termWeeks         Int          @map("term_weeks")
  weeklyPaymentUgx  Int          @map("weekly_payment_ugx")
  totalRepayableUgx Int          @map("total_repayable_ugx")

  // Status tracking
  status            LoanStatus   @default(ACTIVE)
  startDate         DateTime     @map("start_date")
  expectedEndDate   DateTime     @map("expected_end_date")
  actualEndDate     DateTime?    @map("actual_end_date")

  // Balance tracking
  totalPaidUgx      Int          @default(0) @map("total_paid_ugx")
  totalInterestUgx  Int          @default(0) @map("total_interest_ugx")
  totalFeesUgx      Int          @default(0) @map("total_fees_ugx")
  arrearsUgx        Int          @default(0) @map("arrears_ugx")
  remainingBalance  Int          @map("remaining_balance")

  // Default tracking
  weeksOverdue      Int          @default(0) @map("weeks_overdue")
  lastPaymentDate   DateTime?    @map("last_payment_date")
  nextPaymentDue    DateTime     @map("next_payment_due")
  defaultDate       DateTime?    @map("default_date")
  repossessedAt     DateTime?    @map("repossessed_at")
  repossessedBy     String?      @map("repossessed_by")

  // GPS immobilization
  gpsImmobilized    Boolean      @default(false) @map("gps_immobilized")
  gpsImmobilizedAt  DateTime?    @map("gps_immobilized_at")

  createdAt         DateTime     @default(now()) @map("created_at")
  updatedAt         DateTime     @updatedAt @map("updated_at")

  organization      Organization @relation(fields: [orgId], references: [id], onDelete: Cascade)
  loanProduct       LoanProduct  @relation(fields: [loanProductId], references: [id])
  rider             Driver       @relation(fields: [riderId], references: [id])
  vehicle           Vehicle      @relation(fields: [vehicleId], references: [id])
  payments          Payment[]
  paymentReschedules PaymentReschedule[]
  defaulterActions  DefaulterAction[]

  @@index([orgId, status])
  @@index([riderId])
  @@index([nextPaymentDue])
  @@index([status, weeksOverdue])
  @@map("loans")
}

enum LoanStatus {
  PENDING       // Contract signed, waiting for deposit
  ACTIVE        // Payments ongoing
  COMPLETED     // Fully paid
  DEFAULTED     // In default (missed payments)
  REPOSSESSED   // Bike repossessed
  WRITTEN_OFF   // Unrecoverable
  RESTRUCTURED  // Terms renegotiated
}

// ─── Payments ──────────────────────────────────────────────────

model Payment {
  id              String       @id @default(uuid())
  loanId          String       @map("loan_id")
  amountUgx       Int          @map("amount_ugx")
  paymentMethod   PaymentMethod @map("payment_method")
  transactionId   String?      @map("transaction_id") // MoMo transaction reference
  transactionRef  String?      @map("transaction_ref") // External reference
  weekNumber      Int          @map("week_number") // Which week of the loan
  dueDate         DateTime     @map("due_date")
  paidAt          DateTime     @map("paid_at")
  status          PaymentStatus @default(COMPLETED)
  channel         String?      // "MTN_MOMO", "AIRTEL_MONEY", "CASH", "BANK"
  notes           String?
  createdAt       DateTime     @default(now()) @map("created_at")

  loan            Loan         @relation(fields: [loanId], references: [id], onDelete: Cascade)

  @@index([loanId, weekNumber])
  @@index([transactionId])
  @@index([paidAt])
  @@map("payments")
}

enum PaymentMethod {
  MOBILE_MONEY
  CASH
  BANK_TRANSFER
  GUARANTOR_PAYMENT
  DEDUCTION // From rider's wallet/earnings
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// ─── Payment Reschedules ───────────────────────────────────────

model PaymentReschedule {
  id              String       @id @default(uuid())
  loanId          String       @map("loan_id")
  oldDueDate      DateTime     @map("old_due_date")
  newDueDate      DateTime     @map("new_due_date")
  reason          String
  approvedBy      String       @map("approved_by") // User ID
  createdAt       DateTime     @default(now()) @map("created_at")

  loan            Loan         @relation(fields: [loanId], references: [id], onDelete: Cascade)

  @@map("payment_reschedules")
}

// ─── Defaulter Actions ─────────────────────────────────────────

model DefaulterAction {
  id              String       @id @default(uuid())
  loanId          String       @map("loan_id")
  actionType      DefaulterActionType @map("action_type")
  daysOverdue     Int          @map("days_overdue")
  message         String?
  sentTo          String?      // Phone number or user ID
  sentBy          String       @map("sent_by") // User ID or "SYSTEM"
  response        String?      // Rider's response
  actionDate      DateTime     @default(now()) @map("action_date")

  loan            Loan         @relation(fields: [loanId], references: [id], onDelete: Cascade)

  @@index([loanId, actionDate])
  @@map("defaulter_actions")
}

enum DefaulterActionType {
  SMS_REMINDER
  SMS_WARNING
  PHONE_CALL
  GRACE_OFFER
  FINAL_NOTICE
  GPS_LOCK
  GPS_UNLOCK
  REPOSSESSION_ORDER
  REPOSSESSION_COMPLETE
  GUARANTOR_NOTICE
  PAYMENT_RECEIVED
  RESCHEDULE_OFFER
  RESCHEDULE_APPROVED
  INSURANCE_CLAIM
  LEGAL_NOTICE
}

// ─── Rider Wallets (for in-app earnings tracking) ─────────────

model RiderWallet {
  id              String       @id @default(uuid())
  riderId         String       @unique @map("rider_id")
  loanId          String       @map("loan_id")
  balanceUgx      Int          @default(0) @map("balance_ugx")
  totalEarnedUgx  Int          @default(0) @map("total_earned_ugx")
  totalPaidUgx    Int          @default(0) @map("total_paid_ugx")
  totalDeductionsUgx Int       @default(0) @map("total_deductions_ugx")
  lastActivityAt  DateTime?    @map("last_activity_at")
  createdAt       DateTime     @default(now()) @map("created_at")
  updatedAt       DateTime     @updatedAt @map("updated_at")

  rider           Driver       @relation(fields: [riderId], references: [id], onDelete: Cascade)
  loan            Loan         @relation(fields: [loanId], references: [id])
  transactions    WalletTransaction[]

  @@map("rider_wallets")
}

model WalletTransaction {
  id              String       @id @default(uuid())
  walletId        String       @map("wallet_id")
  amountUgx       Int          @map("amount_ugx")
  type            WalletTransactionType
  description     String?
  reference       String?      // External reference
  createdAt       DateTime     @default(now()) @map("created_at")

  wallet          RiderWallet  @relation(fields: [walletId], references: [id], onDelete: Cascade)

  @@index([walletId, createdAt])
  @@map("wallet_transactions")
}

enum WalletTransactionType {
  EARNING        // Daily earning added
  LOAN_DEDUCTION // Weekly payment deducted
  BONUS          // Early payment bonus
  PENALTY        // Late payment fee
  WITHDRAWAL     // Rider cashes out
  ADJUSTMENT     // Manual adjustment
}
```

---

## 7. API Endpoints for Financing Module

### Loans
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/loans` | Create a new loan |
| GET | `/api/v1/loans` | List loans (filter by status, rider, overdue) |
| GET | `/api/v1/loans/:id` | Loan detail with payment history |
| PUT | `/api/v1/loans/:id` | Update loan terms |
| POST | `/api/v1/loans/:id/reschedule` | Reschedule payment |
| POST | `/api/v1/loans/:id/immobilize` | GPS lock the bike |
| POST | `/api/v1/loans/:id/unimmobilize` | GPS unlock the bike |
| POST | `/api/v1/loans/:id/repossess` | Mark as repossessed |
| POST | `/api/v1/loans/:id/complete` | Mark as fully paid |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/payments` | Record a payment |
| GET | `/api/v1/payments` | List payments (filter by loan, date) |
| GET | `/api/v1/payments/upcoming` | Payments due in next 7 days |
| GET | `/api/v1/payments/overdue` | Overdue payments |
| POST | `/api/v1/payments/webhook/momo` | MoMo payment webhook |

### Defaulter Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/defaulters` | List all defaulters |
| POST | `/api/v1/defaulters/:loanId/action` | Log a defaulter action |
| GET | `/api/v1/defaulters/:loanId/actions` | Action history for a loan |
| POST | `/api/v1/defaulters/bulk-sms` | Send bulk SMS to defaulters |
| GET | `/api/v1/defaulters/analytics` | Default rate, recovery rate, etc. |

### Rider Wallets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/wallets/:riderId` | Wallet balance + transactions |
| POST | `/api/v1/wallets/:riderId/credit` | Add earning |
| POST | `/api/v1/wallets/:riderId/debit` | Deduct payment |
| POST | `/api/v1/wallets/:riderId/withdraw` | Rider cash-out |

---

## 8. Background Jobs

| Job | Frequency | Description |
|-----|-----------|-------------|
| `payment-due-reminder` | Daily 8AM EAT | SMS to riders with payments due in 2 days |
| `overdue-check` | Daily 9AM EAT | Identify overdue loans, update arrears |
| `defaulter-escalation` | Daily 10AM EAT | Run graduated response for defaulters |
| `gps-lock-check` | Every 6 hours | Auto-lock bikes past GPS lock threshold |
| `portfolio-report` | Weekly (Monday) | Generate portfolio health report |
| `interest-accrual` | Daily midnight | Calculate and add interest to balances |
| `wallet-deduction` | Daily 11PM EAT | Auto-deduct weekly payment from rider wallet |

---

## 9. Key Metrics to Track

| Metric | Formula | Target |
|--------|---------|--------|
| **On-time payment rate** | On-time payments / Total due | >80% |
| **Default rate** | Defaults / Total loans | <15% |
| **Recovery rate** | Recovered bikes / Defaulted bikes | >90% |
| **Average days to recovery** | Avg days from default to recovery | <21 days |
| **Portfolio at risk** | Value of loans >30 days overdue / Total portfolio | <10% |
| **Rider satisfaction** | Survey score | >4/5 |
| **Effective yield** | Interest earned / Average portfolio | >30% APR |
| **Loss rate** | Written-off value / Total portfolio | <5% |

---

## 10. Competitive Advantage

Current lenders (MOGO, Watu, Tugende) use:
- Basic spreadsheets or simple databases
- Manual payment tracking (MoMo codes)
- Aggressive, one-size-fits-all defaulter treatment
- No rider-facing portal

FleetSpark provides:
- **Full loan lifecycle management** — from contract to completion
- **Automated payment matching** — MoMo webhook integration
- **Graduated defaulter response** — configurable, fair, documented
- **Rider self-service portal** — riders can see their balance, payment history, request rescheduling
- **GPS integration** — automated immobilization with audit trail
- **Portfolio analytics** — data-driven lending decisions

---

## 11. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Riders can't afford payments | High | Flexible terms, partial payments, rescheduling |
| GPS kill switch doesn't work | Medium | Multiple kill methods (remote + at swap station) |
| MoMo payment matching fails | Medium | Manual reconciliation + rider self-report |
| Guarantor disputes | Medium | Clear contract, SMS documentation |
| Regulatory changes | Low | Build compliant from day one, engage Ministry of Trade |
| Fraud (fake identities) | Medium | NIN verification, stage chairman confirmation |
| Bike theft | Medium | GPS tracking + insurance integration |

---

## 12. Pricing for Financing Module

| Feature | Price |
|---------|-------|
| Loan management (up to 50 loans) | Included in base plan |
| 50-200 loans | +$100/mo |
| 200-500 loans | +$250/mo |
| 500+ loans | Custom |
| GPS immobilization integration | +$50/mo |
| MoMo auto-matching | +$50/mo |
| Insurance integration | Revenue share with insurer |

---

*Sources: MOGO Uganda (mogo.co.ug), Global Press Journal (2022), PC Tech Magazine (2024), Daily Monitor, Africa-Press, rider complaints via Facebook/TikTok/Instagram*
