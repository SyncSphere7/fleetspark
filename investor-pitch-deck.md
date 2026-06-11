# FleetSpark — Investor Pitch Deck

**Version:** 1.0  
**Date:** June 11, 2026  
**Prepared by:** SyncSphere LLC  
**Purpose:** Investor pitch — EV Fleet Management Platform for Africa

---

## Slide 1: Title

**FleetSpark**  
*The Operating System for Electric Mobility in Africa*

Fleet Management · Financing · Insurance · Charging · Banking

Founded: 2026 · Kampala, Uganda  
Contact: admin@syncspherellc.com | +1 (432) 692-0996

---

## Slide 2: The Problem

### Africa's $12B Mobility Crisis

**Uganda alone:**
- **700,000+ boda bodas** (motorcycle taxis) — primary transport for 80% of urban commuters
- **$795M/year** spent on vehicle fuel imports (2nd highest import category)
- **Kampala** = 5th most polluted city in Africa
- **Zero** integrated software for EV fleet operators
- **Zero** consumer protection for bike financing (riders exploited)
- **Zero** real-time charging infrastructure visibility

**The fragmentation:**
- Fleet operators use **paper + WhatsApp** to track vehicles
- Bike financiers (MOGO, Watu, Tugende) use **spreadsheets** — aggressive repossession, no flexibility
- Charging stations are **invisible** — riders don't know where to charge, what's available, or what it costs
- Insurance is **mandatory but opaque** — riders don't understand coverage
- Banks **won't lend** to riders — no proof of income despite mobile money data

**Result:** EV adoption is stalling. Operators can't scale. Riders are trapped. Investors see risk.

---

## Slide 3: The Solution

### FleetSpark — One Platform, Five Modules

**Fleet Management** (all vehicle types)
- Real-time GPS tracking, battery monitoring, trip history, maintenance scheduling
- Works for buses, bikes, cars, vans — anything with a battery

**Financing & Credit** (bikes on installment)
- Digital loan contracts, Mobile Money payments, graduated defaulter management
- GPS kill switch for repossession, rider wallets, income-based scoring
- **Transparent terms** — no hidden fees, no surprise repossessions

**Insurance Integration**
- Third-party (mandatory), accident, theft, comprehensive
- Premium calculator, policy management, claims processing
- **Insurance-loan linkage** — payout covers outstanding loan first

**Charging Infrastructure** ⚡ *(NEW)*
- **Nationwide charging spot map** — all stations, real-time availability
- **Battery swap tracking** — which stations have available swap batteries
- **Charging payments** — pay per kWh via Mobile Money (MTN/Airtel)
- **Realtime spot updates** — which chargers are in use, which are free
- **Battery consumption analytics** — per vehicle, per route, per rider
- **Distance estimation** — "Can I reach the next charging station?" based on current battery

**Banking & Income Verification**
- Mobile money statement retrieval (MTN MoMo, Airtel Money API)
- Income scoring engine (0-100) based on transaction patterns
- **Proof of income certificates** for bank loan origination
- Bank partnership API for pre-approval workflows

---

## Slide 4: Market Opportunity

### TAM → SAM → SOM

| Level | Market | Value |
|-------|--------|-------|
| **TAM** | Africa EV fleet management | $12B by 2030 |
| **SAM** | East Africa (Uganda, Kenya, Rwanda, Tanzania) | $2.4B by 2030 |
| **SOM** | Uganda EV fleet + financing + charging | $180M by 2028 |

**Uganda specifics:**
- 700,000+ boda bodas → 5% EV penetration = 35,000 e-bodas
- 3,000+ electric vehicles currently, growing 40% YoY
- Government target: 3,500 charging stations by 2040
- **Zero competitors** with integrated platform

**Comparable markets:**
- **India** (Ola Electric, Yulu): $4B+ valuation for integrated e-mobility
- **Kenya** (BasiGo, Roam): $50M+ raised for single-module solutions
- **FleetSpark** = all modules combined, first-mover in Uganda

---

## Slide 5: Business Model

### Revenue Streams

| Stream | Source | Pricing | Year 1 Projection |
|--------|--------|---------|-------------------|
| **Fleet SaaS** | Fleet operators | $150-5,000/mo | $60K |
| **Financing SaaS** | Bike financiers | $100-500/mo + per-loan fee | $30K |
| **Payment Processing** | Riders (MoMo) | 0.5-1% per transaction | $15K |
| **Charging Commissions** | Charging station operators | 5-10% per kWh sale | $20K |
| **Insurance Commission** | Insurance partners | 10-15% of premium | $12K |
| **Income Certificates** | Riders/Banks | UGX 10-25K each | $8K |
| **Bank Data Analytics** | Banks | $500-2,000/mo | $6K |

**Year 1 Total: $151K**  
**Year 2 (with Rwanda/Kenya expansion): $600K**  
**Year 3: $1.2M**

**Unit economics:**
- CAC: ~$50 per fleet operator (direct sales)
- LTV: $3,000+ per operator (24-month retention)
- Gross margin: 75% (SaaS) + 15% (transaction fees)

---

## Slide 6: Traction & Validation

### What We Have Today

✅ **Full platform built** — backend (Node.js + Prisma + PostgreSQL) + frontend (React + Tailwind)  
✅ **Database schema** — 25+ tables covering all 5 modules  
✅ **API layer** — 50+ REST endpoints + WebSocket realtime  
✅ **Seed data** — 2 demo organizations, 12 vehicles, 12 drivers, 5 loans, 3 insurance policies  
✅ **GitHub repo** — github.com/SyncSphere7/fleetspark  
✅ **Documentation** — 10 professional documents (PRD, architecture, API, UI/UX, deployment, user manual, financing module, EV market research)  
✅ **Market research** — 50+ sources on Uganda EV market, charging infrastructure, financing landscape  

### Validation from Market

- **Uganda's EV manufacturers** — 24+ electric buses deployed, no fleet management software
- **Zembo** — 27 swap stations, 2,000+ bikes, no integrated software platform
- **Spiro** — 1,500+ swap stations across Africa, growing 40% YoY
- **MOGO/Watu/Tugende** — $100M+ in bike loans, all managed on spreadsheets
- **Government alignment** — National E-Mobility Strategy mandates 3,500 charging stations by 2040

### Pilot Pipeline

| Partner | Status | Timeline |
|---------|--------|----------|
| EV Bus Manufacturer | Pilot proposal sent | Q3 2026 |
| Zembo Bikes | In conversation | Q3 2026 |
| Total Uganda | Charging data partnership | Q4 2026 |
| Stanbic Bank | Banking API discussion | Q4 2026 |
| Jubilee Insurance | Insurance integration | Q4 2026 |

---

## Slide 7: Competitive Landscape

### No One Has the Full Stack

| Competitor | Fleet | Financing | Insurance | Charging | Banking |
|------------|-------|-----------|-----------|----------|---------|
| **MOGO** | ❌ | ✅ Basic | ❌ | ❌ | ❌ |
| **Watu Credit** | ❌ | ✅ Basic | ❌ | ❌ | ❌ |
| **Optibus** | ✅ Buses only | ❌ | ❌ | ❌ | ❌ |
| **Geotab** | ✅ Expensive | ❌ | ❌ | ❌ | ❌ |
| **Lendsqr** | ❌ | ✅ Lending only | ❌ | ❌ | ❌ |
| **ChargePoint** | ❌ | ❌ | ❌ | ✅ Charging only | ❌ |
| **FleetSpark** | ✅ | ✅ | ✅ | ✅ | ✅ |

**Our moat:** First-mover advantage in integrated EV platform for Africa. Every competitor solves ONE problem. We solve FIVE.

---

## Slide 8: Go-to-Market Strategy

### Phase 1: Uganda (Year 1)
- **Anchor clients:** 2-3 bus fleet operators + 1 bike financier
- **Charging partnerships:** Integrate all 27 Zembo stations + Total Uganda stations + Makerere University fast charger
- **Insurance partnerships:** Jubilee + APA (cover 30% of market)
- **Banking partnerships:** Stanbic + DFCU (cover 40% of bank lending)

### Phase 2: East Africa (Year 2)
- **Kenya:** Largest regional EV market (BasiGo, Roam already active)
- **Rwanda:** Strongest EV policy in Africa (tax exemptions, ICE restrictions)
- **Tanzania:** 10,000+ electric two-wheelers deployed

### Phase 3: Pan-Africa (Year 3)
- **Nigeria:** Largest motorcycle market in Africa (10M+ bikes)
- **Ghana:** Growing EV adoption, government incentives
- **Senegal:** Emerging e-mobility hub

### Distribution
- Direct sales to fleet operators (B2B)
- Partnerships with EV manufacturers (Spiro, Zembo, local assemblers)
- Government partnerships (KCCA, Ministry of Energy)
- Bank partnerships for rider acquisition

---

## Slide 9: Team

### SyncSphere LLC

**Founded:** 2026  
**Headquarters:** United States (operating in Uganda)  
**Team:** Full-stack development team with deep domain expertise in East African mobility, fintech, and energy sectors. Founder: Cliff.

**Why us:**
- Deep understanding of Uganda/East Africa market
- Existing relationships with EV manufacturers, charging networks, and financial institutions
- Full-stack development capability
- Already built and deployed SaaS products (AfriNova, Affiluxe, SynqSocial)
- Understanding of Mobile Money ecosystem (MTN, Airtel)
- Knowledge of regulatory landscape (IRA, BoU, KCCA)

**Advisors needed:**
- EV industry expert (Africa)
- Former banking executive (East Africa)
- Charging infrastructure specialist

---

## Slide 10: The Ask

### Seeking: $500K Seed Round

**Use of funds:**

| Category | Amount | % |
|----------|--------|---|
| Engineering (2 senior devs, 12 months) | $200K | 40% |
| Sales & partnerships | $100K | 20% |
| Infrastructure (servers, APIs, MoMo integration) | $75K | 15% |
| Insurance & banking API integrations | $50K | 10% |
| Legal & compliance | $40K | 8% |
| Operations & marketing | $35K | 7% |

**Milestones with this round:**
- ✅ Launch MVP (Q3 2026)
- ✅ 3 paying fleet operators (Q4 2026)
- ✅ 1 bike financier on financing module (Q4 2026)
- ✅ 50 charging stations on the platform (Q1 2027)
- ✅ 1 bank partnership live (Q1 2027)
- ✅ Expand to Kenya (Q2 2027)

**Target raise:** $500K  
**Valuation:** $3M pre-money  
**Instrument:** SAFE (Simple Agreement for Future Equity)

---

## Appendix: Key Metrics to Track

| Metric | Target (Year 1) |
|--------|-----------------|
| Fleet operators on platform | 5 |
| Vehicles tracked | 500 |
| Bike loans managed | 1,000 |
| Charging stations mapped | 50 |
| Insurance policies sold | 500 |
| Income certificates generated | 200 |
| Monthly recurring revenue | $12K |
| Gross margin | 70% |

---

*This document is confidential and intended for potential investors only.*  
*FleetSpark © 2026 SyncSphere LLC. All rights reserved.*
