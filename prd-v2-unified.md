# FleetSpark — Unified Product Requirements Document (PRD)

**Version:** 2.0  
**Date:** June 11, 2026  
**Author:** SyncSphere CEO  
**Status:** Unified spec — Fleet + Financing + Insurance + Banking

---

## 1. Product Overview

### What is FleetSpark?
FleetSpark is an **all-in-one Electric Vehicle Platform** for African markets. It combines four critical functions that are currently fragmented across different systems:

1. **Fleet Management** — GPS tracking, battery monitoring, trip history, maintenance (all vehicle types)
2. **Financing & Credit** — Loan management, payment tracking, defaulter recovery (bikes on credit)
3. **Insurance** — Third-party, accident, theft, and comprehensive coverage integration
4. **Banking & Income Verification** — Mobile money statements, bank partnerships, proof of income

### Why does it exist?
- **Fleet operators** (bus companies, logistics) have no affordable local fleet management software
- **Bike financiers** (MOGO, Watu, Tugende) use spreadsheets and aggressive repossession — riders are exploited
- **Insurance** is mandatory but riders don't understand it, can't compare options, and claims are painful
- **Banks** won't lend to riders because there's no proof of income — but mobile money tells the story
- **No platform connects all four** — FleetSpark does

### Who is it for?

| User Type | What They Use | Why |
|-----------|--------------|-----|
| **Bus fleet operators** | Fleet Management module | Track buses, monitor batteries, reduce downtime |
| **Bike fleet operators / Financiers** | Fleet + Financing modules | Manage bike loans, track payments, recover defaulters |
| **Individual riders** | Rider portal (mobile) | See loan balance, pay via MoMo, request rescheduling |
| **Insurance companies** | Insurance module (B2B) | Sell policies, process claims, reduce fraud |
| **Banks / Microfinance** | Banking module (B2B) | Access mobile money statements, verify income, originate loans |
| **Government** | Reporting module | Track e-mobility adoption, verify compliance |

### The Platform Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLEETSPARK PLATFORM                          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   FLEET       │  │  FINANCING   │  │  INSURANCE   │         │
│  │   MANAGEMENT  │  │  & CREDIT    │  │  MODULE      │         │
│  │              │  │              │  │              │         │
│  │ • GPS track  │  │ • Loans      │  │ • 3rd party  │         │
│  │ • Battery    │  │ • Payments   │  │ • Accident   │         │
│  │ • Trips      │  │ • Defaulter  │  │ • Theft      │         │
│  │ • Maintenance│  │   recovery   │  │ • Claims     │         │
│  │ • Alerts     │  │ • Rider      │  │ • Premium    │         │
│  │ • Reports    │  │   wallets    │  │   calculator │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                 │                 │                  │
│  ┌──────┴─────────────────┴─────────────────┴──────┐          │
│  │              SHARED CORE                          │          │
│  │  • Vehicle registry (all types)                   │          │
│  │ • Driver/Rider profiles                           │          │
│  │ • GPS infrastructure                              │          │
│  │ • Organization & user management                  │          │
│  │ • Notifications (SMS, email, in-app)              │          │
│  │ • Mobile Money payments (MTN, Airtel)             │          │
│  └──────────────────────┬───────────────────────────┘          │
│                         │                                       │
│  ┌──────────────────────┴───────────────────────────┐          │
│  │              BANKING & INCOME MODULE               │          │
│  │  • Mobile money statement retrieval               │          │
│  │  • Income verification & scoring                  │          │
│  │  • Bank loan origination API                      │          │
│  │  • Proof of income certificates                   │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Module 1: Fleet Management (All Vehicles)

*This is the foundation. Every vehicle — bus, bike, car, van — is tracked here.*

### 2.1 Vehicle Registry
- Register any vehicle type: `BUS` | `BIKE` | `CAR` | `VAN` | `TRUCK` | `COACH`
- Fields: name, plate, VIN, model, year, type, battery capacity, max range, depot, device ID
- Each vehicle gets a unique ID and appears on the fleet map
- Soft-delete (deactivate) without losing data

### 2.2 GPS Tracking
- Real-time location via GPS telematics (Teltonika, OBD-II, or manual)
- Location updates every 30 seconds (configurable)
- Map view with color-coded markers by status
- Location history queryable by date range
- Geofencing: circular zones with entry/exit alerts

### 2.3 Battery Monitoring (EV-specific)
- Current level (%), State of Health (SoH), voltage, temperature
- Charging status detection
- Estimated range calculation
- Charge cycle tracking
- Charging session records (start/end time, energy consumed)
- Low battery alerts (configurable threshold)

### 2.4 Trip Tracking
- Auto-detected trips (ignition on → ignition off)
- Distance, duration, avg/max speed per trip
- Route visualization on map
- Trip history per vehicle, filterable by date

### 2.5 Maintenance Management
- Schedule by date, odometer, or engine hours
- Types: routine, repair, inspection, battery service, tire, brake, other
- Upcoming maintenance alerts
- Maintenance history per vehicle
- Cost tracking

### 2.6 Alerts Engine
- Low battery, offline, maintenance due, geofence exit, high temperature, rapid battery drop
- Configurable thresholds per organization
- Graduated severity: INFO → WARNING → CRITICAL
- Notification channels: in-app, email, SMS
- Acknowledgment with audit trail

### 2.7 Dashboard
- Summary cards: total, active, charging, maintenance, alerts
- Fleet map with all vehicles
- Vehicle list with search/filter
- Real-time WebSocket updates

---

## 3. Module 2: Financing & Credit (Bikes + Vehicles on Installment)

*This module extends the fleet management core with financial tracking. It's designed for operators who sell vehicles/bikes on credit.*

### 3.1 Loan Products
Define reusable loan templates:
- Name (e.g., "E-Boda Standard 24mo")
- Vehicle type (BIKE, CAR, etc.)
- Bike price, min deposit, interest rate, term (weeks)
- Auto-calculated: weekly payment, total cost, effective APR

### 3.2 Loan Origination
When a rider wants to buy a bike on credit:
1. Select loan product
2. Enter rider details (or link existing driver profile)
3. Enter guarantor details (name, phone, NIN, relationship)
4. System generates contract with full terms
5. Rider signs (e-signature or SMS confirmation)
6. Deposit payment recorded (via MoMo or cash)
7. Loan status: ACTIVE
8. Bike assigned to rider in the system

### 3.3 Payment Tracking
- **Mobile Money auto-matching** via Flutterwave/MTN/Airtel APIs
- Weekly payment schedule auto-generated
- Payment history ledger per rider
- Automatic SMS receipt after each payment
- Payment reminders (SMS 1 day before due date)
- Partial payment acceptance
- Early payment bonus (configurable discount)

### 3.4 Flexible Repayment
- **Rescheduling:** 1 reschedule per quarter (manager approval required)
- **Emergency pause:** Up to 2 weeks for documented emergencies (hospital, accident)
- **Partial payments:** Accept any amount, reduce arrears
- **Grace period:** Configurable (default 7 days) before marking default

### 3.5 Defaulter Management (Graduated Response)

| Stage | Days Overdue | Action | Channel |
|-------|-------------|--------|---------|
| Reminder | 1-3 | Friendly SMS | SMS |
| Warning | 4-7 | Formal warning + call | SMS + Phone |
| Grace offer | 8-14 | Offer payment plan adjustment | Phone call |
| Final notice | 15-21 | Final warning before GPS lock | SMS + Phone |
| GPS lock | 22-30 | Remote immobilization | GPS kill switch |
| Repossession | 30+ | Physical repossession | Field agent |
| Recovery | Post-repo | Arrears notice, storage, sale | Formal letter |

**Key differentiator:** Current lenders (MOGO, Watu) repossess after 1-2 missed payments. FleetSpark gives riders **multiple chances** with clear communication at every stage. This reduces defaults because riders don't hide.

### 3.6 GPS Kill Switch Integration
- Remote immobilization via Teltonika SECO or similar
- Triggered automatically at GPS lock stage
- Rider notified via SMS before activation
- Unlock after payment (automatic or manual)
- Full audit trail of lock/unlock events

### 3.7 Guarantor Management
- Store guarantor details (name, phone, NIN, relationship)
- Automatic SMS to guarantor when rider defaults
- Guarantor payment portal (can pay on rider's behalf)
- Guarantor liability tracking

### 3.8 Rider Wallets
- Each rider has a wallet linked to their loan
- Daily earnings can be credited (by operator or auto-tracked)
- Weekly payment auto-deducted from wallet
- Rider can see balance, transaction history
- Cash-out option (withdraw excess)

### 3.9 Portfolio Analytics
- On-time payment rate (target: >80%)
- Default rate (target: <15%)
- Recovery rate (target: >90%)
- Average days to recovery (target: <21 days)
- Portfolio at risk (target: <10%)
- Effective yield (target: >30% APR)
- Loss rate (target: <5%)
- Default rate by cohort (which month's loans default most?)

---

## 4. Module 3: Insurance Integration

*Insurance is mandatory in Uganda (third-party) but riders don't understand it, can't compare options, and claims are painful. FleetSpark connects riders with insurance companies and simplifies everything.*

### 4.1 Insurance Products Supported

| Coverage Type | What It Covers | Typical Premium | Mandatory? |
|--------------|----------------|-----------------|------------|
| **Third Party Only** | Bodily injury + property damage to others | ~UGX 100,000-200,000/yr | ✅ Yes (by law) |
| **Third Party, Fire & Theft** | Above + fire damage + bike theft | ~UGX 200,000-400,000/yr | ❌ |
| **Comprehensive** | Above + own damage, medical, towing | ~4-6% of bike value/yr | ❌ |
| **Personal Accident** | Rider death/disability from accident | ~UGX 50,000-150,000/yr | ❌ |
| **Passenger Liability** | Injury/death of passenger | Included in comprehensive | ❌ |

### 4.2 Insurance Partners (Uganda Market)

| Company | Market Share | Products | API Available? |
|---------|-------------|----------|----------------|
| **Jubilee Insurance** | ~18% | Motor 3rd party, comprehensive, PA | ❌ (manual) |
| **APA Insurance** | ~12% | Motorcycle cover, 3rd party, comprehensive | ❌ (manual) |
| **GA Insurance** | ~10% | Motorcycle insurance, 3rd party | ❌ (manual) |
| **Old Mutual** | ~8% | Motor private, 3rd party, personal accident | ❌ (manual) |
| **UAP Old Mutual** | ~7% | Motor, health, life | ❌ (manual) |
| **ICEA Lion** | ~6% | Motor, general | ❌ (manual) |
| **Prudential** | ~5% | Life, health, motor | ❌ (manual) |
| **Sanlam** | ~4% | Motor, general | ❌ (manual) |

**Note:** Most Ugandan insurers don't have public APIs. Integration will be:
- **Phase 1:** Manual policy entry + document upload + premium calculator
- **Phase 2:** Partner with 1-2 insurers for API integration (Jubilee or APA as anchor)
- **Phase 3:** Full API marketplace with multiple insurers

### 4.3 Insurance Features

#### Premium Calculator
- Input: bike value, coverage type, rider age, location
- Output: estimated premium from each partner
- Side-by-side comparison
- Recommendation based on rider's risk profile

#### Policy Management
- Store policy details (company, policy number, coverage, premium, expiry)
- Policy document upload (photo/PDF)
- Expiry alerts (30 days, 7 days, 1 day before)
- Renewal reminders via SMS
- Link policy to specific vehicle/bike

#### Claims Management
- File a claim from the platform
- Upload photos, police report, documents
- Track claim status (submitted → under review → approved → paid)
- Communication log with insurer
- Claim history per vehicle

#### Insurance-Loan Integration
- **Mandatory for financed bikes:** No insurance = no loan
- Premium can be added to loan amount (rider pays over time)
- Insurance payout goes to lender first (covers outstanding loan)
- Rider gets the remainder

#### Compliance Tracking
- Verify third-party insurance is active (mandatory by law)
- Alert if policy expires
- Digital insurance certificate storage
- Government compliance reporting

---

## 5. Module 4: Banking & Income Verification

*Banks won't lend to boda boda riders because there's "no proof of income." But mobile money tells the story. FleetSpark bridges this gap.*

### 5.1 Mobile Money Statement Retrieval

#### How It Works
1. Rider grants permission (via USSD or app)
2. FleetSpark requests statement from MTN/Airtel via their Open APIs
3. Statement is parsed and stored
4. Income is calculated from transaction patterns
5. Proof of income certificate is generated

#### MTN MoMo Open API
- **Endpoint:** `https://api.mtn.co.ug/momo/v1/statements`
- **Auth:** OAuth 2.0 (requires MTN developer account)
- **Data returned:** Transaction history (6-12 months)
- **Cost:** Free for up to 1000 requests/month (developer tier)

#### Airtel Money Open API
- **Endpoint:** `https://api.airtel.africa/merchant/v1/statements`
- **Auth:** API key + OAuth
- **Data returned:** Transaction history
- **Cost:** Free tier available

#### Alternative: Flutterwave Aggregate API
- Single API for both MTN and Airtel
- **Endpoint:** `https://api.flutterwave.com/v3/...`
- **Auth:** API key
- **Advantage:** One integration, both networks
- **Cost:** Per-transaction fee (~1.4%)

### 5.2 Income Verification Engine

#### What It Analyzes
- **Daily inflows:** Money received (rides, transfers)
- **Daily outflows:** Money sent (payments, airtime, savings)
- **Net daily income:** Inflows - Outflows
- **Consistency:** Days with income vs zero-income days
- **Trend:** Increasing, stable, or decreasing
- **Seasonality:** Weekday vs weekend patterns

#### Income Score (0-100)
| Factor | Weight | How Measured |
|--------|--------|-------------|
| Average daily income | 30% | Mean of last 90 days |
| Income consistency | 25% | % of days with income > UGX 10,000 |
| Income trend | 20% | Slope of 90-day income line |
| Transaction volume | 15% | Total transactions per month |
| Savings behavior | 10% | Money moved to savings accounts |

#### Proof of Income Certificate
Auto-generated PDF containing:
- Rider name, NIN, phone number
- Mobile money provider (MTN/Airtel)
- Statement period (e.g., last 6 months)
- Average daily/monthly income
- Income score (0-100)
- Transaction summary
- FleetSpark verification stamp
- QR code for bank verification

### 5.3 Bank Partnership Integration

#### Target Banks (Uganda)
| Bank | Market Position | Digital API | Fintech Friendly? |
|------|----------------|-------------|-------------------|
| **Stanbic Bank** | Largest by assets | ✅ Yes | ✅ Very |
| **DFCU Bank** | Strong SME focus | ✅ Yes (FinForward) | ✅ Very |
| **Centenary Bank** | Largest branch network | ⚠️ Limited | ✅ Yes |
| **Equity Bank** | Growing fast | ✅ Yes | ✅ Yes |
| **KCB Bank** | Regional presence | ✅ Yes | ✅ Yes |
| **Absa Bank** | International | ✅ Yes | ✅ Yes |
| **PostBank** | Government-backed | ⚠️ Limited | ⚠️ Moderate |
| **BRAC Bank** | Microfinance leader | ⚠️ Limited | ✅ Yes |

#### Integration Approach
1. **Phase 1:** Generate proof of income certificates → banks manually verify
2. **Phase 2:** API integration with 1-2 partner banks (Stanbic or DFCU as anchor)
3. **Phase 3:** Full open banking integration (when Uganda adopts open banking standards)

#### Loan Origination Flow
```
Rider wants a bike loan
    → FleetSpark generates income certificate from MoMo data
    → Certificate sent to partner bank
    → Bank pre-approves based on income score
    → Loan terms offered (amount, rate, term)
    → Rider accepts
    → Bank disburses to FleetSpark (not directly to rider)
    → FleetSpark gives rider the bike
    → Rider pays bank via FleetSpark (MoMo deductions)
    → FleetSpark remits to bank
```

#### Revenue Model for Banking Module
- **Income certificate:** UGX 10,000-25,000 per certificate (paid by rider or bank)
- **Loan origination fee:** 1-2% of loan amount (paid by bank)
- **Payment processing:** 0.5-1% of each payment (paid by bank)
- **Data analytics:** Monthly subscription for banks (access to anonymized income data)

---

## 6. Unified Database Schema (Key Tables)

### Core Tables (All Modules)
- `organizations` — Multi-tenant orgs
- `users` — Admin, managers, drivers, viewers
- `vehicles` — All vehicle types (bus, bike, car, van, truck)
- `drivers` — Also serves as "riders" for bikes
- `locations` — GPS time-series (TimescaleDB)
- `battery_logs` — Battery time-series
- `trips` — Trip records
- `maintenance` — Maintenance records
- `alerts` — Alert log

### Financing Tables
- `loan_products` — Reusable loan templates
- `loans` — Active and historical loans
- `payments` — Payment transactions
- `payment_reschedules` — Reschedule history
- `defaulter_actions` — Graduated response log
- `rider_wallets` — Rider wallet balances
- `wallet_transactions` — Wallet ledger

### Insurance Tables
- `insurance_partners` — Insurance companies
- `insurance_products` — Available coverage types
- `policies` — Active and historical policies
- `claims` — Insurance claims
- `premium_payments` — Premium payment records

### Banking Tables
- `bank_partners` — Partner banks
- `mobile_money_statements` — Retrieved MoMo statements
- `income_verifications` — Income analysis results
- `income_certificates` — Generated proof of income
- `bank_loans` — Loans originated through bank partners
- `bank_disbursements` — Bank loan disbursements

---

## 7. MVP Scope (Revised for v2.0)

### Phase 1: Core Fleet (Weeks 1-4) — UNCHANGED
- Vehicle registry, GPS tracking, battery monitoring, trips, maintenance, alerts, dashboard
- Target: Kiira Motors pilot (24 buses)

### Phase 2: Financing Module (Weeks 5-8) — NEW
- Loan products, loan origination, payment tracking (MoMo via Flutterwave)
- Defaulter management (graduated response)
- GPS kill switch integration
- Rider wallets
- Target: Bike financing operators

### Phase 3: Insurance Module (Weeks 9-10) — NEW
- Premium calculator (manual, multiple insurers)
- Policy management
- Claims tracking
- Insurance-loan integration
- Target: All financed bikes

### Phase 4: Banking Module (Weeks 11-12) — NEW
- Mobile money statement retrieval (Flutterwave API)
- Income verification engine
- Proof of income certificate generation
- Bank partnership outreach (Stanbic/DFCU)
- Target: Banks, microfinance, bike financiers

---

## 8. Revenue Model (Unified)

| Revenue Stream | Source | Price |
|---------------|--------|-------|
| **Fleet SaaS** | Fleet operators | $150-5,000/mo per org |
| **Financing SaaS** | Bike financiers | $100-500/mo + per-loan fee |
| **Payment processing** | Riders (via MoMo) | 0.5-1% per transaction |
| **Insurance commission** | Insurance partners | 10-15% of premium |
| **Income certificates** | Riders or banks | UGX 10,000-25,000 each |
| **Loan origination** | Banks | 1-2% of loan amount |
| **Bank data analytics** | Banks | $500-2,000/mo |

### Projected Revenue (Conservative, Year 1)
| Scenario | Monthly | Annual |
|----------|---------|--------|
| 2 fleet operators + 1 bike financier + 500 riders | $3,000-8,000 | $36-96K |
| + 2 insurance partners | +$1,000-3,000 | +$12-36K |
| + 1 bank partnership | +$500-2,000 | +$6-24K |
| **Total Year 1** | **$4,500-13,000** | **$54-156K** |

---

## 9. Competitive Landscape (Unified View)

| Competitor | Fleet Mgmt | Financing | Insurance | Banking |
|------------|-----------|-----------|-----------|---------|
| **MOGO** | ❌ | ✅ (basic) | ❌ | ❌ |
| **Watu Credit** | ❌ | ✅ (basic) | ❌ | ❌ |
| **Tugende** | ❌ | ✅ (basic) | ❌ | ❌ |
| **Optibus** | ✅ (buses only) | ❌ | ❌ | ❌ |
| **Geotab** | ✅ (expensive) | ❌ | ❌ | ❌ |
| **Lendsqr** | ❌ | ✅ (lending only) | ❌ | ❌ |
| **FleetSpark** | ✅ | ✅ | ✅ | ✅ |

**No one else combines all four.** This is the moat.

---

## 10. Open Questions

1. **Insurance API:** Which insurer wants to be first partner? (Jubilee or APA recommended)
2. **Bank API:** Stanbic or DFCU for first integration?
3. **MoMo API:** Direct MTN/Airtel integration or Flutterwave aggregate?
4. **GPS hardware:** Which kill switch system is most common in Uganda? (Teltonika confirmed)
5. **Regulation:** Does the Insurance Regulatory Authority (IRA) have API requirements?
6. **Rider literacy:** Should the rider portal support Luganda language?

---

*Sources: MOGO Uganda, Global Press Journal, PC Tech Magazine, APA Insurance, GA Insurance, Flutterwave, MTN Open API, Airtel Open API, DFCU Bank, Stanbic Bank, Insurance Regulatory Authority of Uganda, Uganda Insurers Association*
