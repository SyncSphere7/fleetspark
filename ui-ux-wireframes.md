# FleetSpark — UI/UX Wireframes & Sitemap

**Version:** 1.0  
**Date:** June 11, 2026  
**Design Principles:** Mobile-first, data-dense, fast on 3G

---

## 1. Sitemap

```
FleetSpark
├── Login
├── Register
├── Dashboard (Home)
│   └── Fleet Map (full screen map view — toggle)
├── Vehicles
│   ├── Vehicle List
│   ├── Vehicle Detail
│   │   ├── Overview (tab)
│   │   ├── Location / Tracking (tab)
│   │   ├── Battery (tab)
│   │   ├── Trips (tab)
│   │   ├── Maintenance (tab)
│   │   └── Settings (tab)
│   └── Add Vehicle (modal/page)
│   └── Edit Vehicle (modal/page)
├── Drivers
│   ├── Driver List
│   ├── Driver Detail
│   ├── Add Driver (modal)
│   └── Assign Vehicle (modal)
├── Alerts
│   ├── Alert List
│   └── Alert Settings
├── Reports
│   ├── Fleet Summary
│   └── Export (CSV / PDF)
└── Settings
    ├── Organization
    ├── Users & Roles
    ├── Alert Configuration
    └── Telemetry Keys
```

---

## 2. Global Layout

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  [☰] FleetSpark    🔍 Search...       🔔 [5]  👤 Admin ▾  │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ SIDEBAR  │  MAIN CONTENT AREA                               │
│          │                                                  │
│ 🏠 Dash  │  (Page content here)                             │
│ 🚐 Veh   │                                                  │
│ 👤 Drv   │                                                  │
│ ⚠️ Alert │                                                  │
│ 📊 Rpts  │                                                  │
│ ⚙️ Sett  │                                                  │
│          │                                                  │
│ ────────│                                                  │
│ 📖 Docs  │                                                  │
│ 💬 Help  │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘

MOBILE: Sidebar collapses to hamburger menu
        Full-width content
        Bottom nav bar (Dashboard | Vehicles | Alerts | More)
```

---

## 3. Login Page

```
┌──────────────────────────────────────────┐
│                                          │
│          ⚡ FleetSpark                   │
│          EV Fleet Management             │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  📧  Email                         │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │  🔒  Password                      │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [ ] Remember me           Forgot password?│
│                                          │
│  ┌────────────────────────────────────┐  │
│  │         Sign In                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Don't have an account? Sign up          │
│                                          │
│  ──  Powered by SyncSphere LLC  ──      │
└──────────────────────────────────────────┘
```

---

## 4. Dashboard (Home) — Main View

```
┌─────────────────────────────────────────────────────────────┐
│  Fleet Dashboard                              June 11, 2026 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  TOTAL   │ │ ACTIVE  │ │CHARGING │ │   IN    │          │
│  │   24     │ │   18    │ │    3     │ │MAINT. 1 │          │
│  │ vehicles │ │ (75%)   │ │ (12%)   │ │  (4%)   │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                              │
│  ┌──────────────────────────────────────┐ ┌──────────────┐  │
│  │                                      │ │ ALERTS   [5] │  │
│  │         FLEET MAP                    │ │ ⚠️ Kayoola-03│  │
│  │     (OpenStreetMap)                  │ │ Battery: 18% │  │
│  │                                      │ │              │  │
│  │   📍        📍                       │ │ ⚠️ Kayoola-07│  │
│  │      📍         📍                   │ │ Offline 45m  │  │
│  │   📍     📍     📍                   │ │              │  │
│  │         📍                           │ │ ℹ️ Kayoola-12│  │
│  │                                      │ │ Maint. due   │  │
│  │                                      │ │              │  │
│  │  Legend: ● Active  ● Charging        │ │ ⚠️ Kayoola-15│  │
│  │          ● Idle    ● Alert           │ │ Battery: 15% │  │
│  │          ● Maint.  ● Offline         │ │              │  │
│  │                                      │ │ ℹ️ Kayoola-22│  │
│  │                                      │ │ Maint. due   │  │
│  └──────────────────────────────────────┘ │ [View All →] │  │
│                                            └──────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ VEHICLE LIST                  [Filter ▾] [Search...]   ││
│  │─────────────────────────────────────────────────────────││
│  │ Name        Plate      Status    Battery  Driver  Last  ││
│  │─────────────────────────────────────────────────────────││
│  │ Kayoola-001 UAX 123A  🟢 Active   72%     J.Kato  2m   ││
│  │ Kayoola-002 UAX 124A  🔵 Charging 45%     S.Naki  5m   ││
│  │ Kayoola-003 UAX 125A  🔴 Alert!    18%     D.Oke   1m   ││
│  │ Kayoola-004 UAX 126A  ⚪ Idle      85%     Unas.   30m  ││
│  │ Kayoola-005 UAX 127A  🟣 Maint.   ---     J.Kato  ---  ││
│  │ Kayoola-006 UAX 128A  ⚫ Offline   62%     D.Oke   45m  ││
│  │ ...                                                      ││
│  │─────────────────────────────────────────────────────────││
│  │ [< 1] [2] [3] ... [10 >]          Showing 1-25 of 24   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Dashboard — Mobile View

```
┌─────────────────────────────┐
│ [≡] ⚡ FleetSpark  🔔 [5] 👤│
├─────────────────────────────┤
│                             │
│  ┌─────────┐ ┌─────────┐   │
│  │  TOTAL   │ │ ACTIVE  │   │
│  │   24     │ │   18    │   │
│  └─────────┘ └─────────┘   │
│  ┌─────────┐ ┌─────────┐   │
│  │CHARGING │ │   ALERT │   │
│  │    3    │ │    5    │   │
│  └─────────┘ └─────────┘   │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │     FLEET MAP         │  │
│  │     (scrollable)      │  │
│  │                       │  │
│  │   📍    📍            │  │
│  │     📍     📍         │  │
│  │   📍        📍        │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  VEHICLES                   │
│  ┌───────────────────────┐  │
│  │ Kayoola-001  🟢 72%   │  │
│  │ UAX 123A  · J.Kato    │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Kayoola-002  🔵 45%   │  │
│  │ UAX 124A  · S.Naki    │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Kayoola-003  🔴 18%   │  │
│  │ UAX 125A  · D.Oke !   │  │
│  └───────────────────────┘  │
│  ...                        │
│                             │
├─────────────────────────────┤
│  🏠      🚐      ⚠️      ≡  │
│ Dash   Veh    Alerts  More │
└─────────────────────────────┘
```

---

## 6. Vehicle Detail Page — Overview Tab

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Vehicles                                         │
│  🚌 Kayoola-001            Status: 🟢 IN_TRANSIT            │
│  UAX 123A · Kayoola EVS · 2025                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Overview] [Location] [Battery] [Trips] [Maint.] [Settings]│
│                                                              │
│  ┌────────────────────────────┐  ┌────────────────────────┐ │
│  │    CURRENT LOCATION        │  │      BATTERY            │ │
│  │    (Mini Map)              │  │                        │ │
│  │                            │  │    ┌─────────────┐     │ │
│  │    📍                      │  │    │   ████████  │     │ │
│  │                            │  │    │   █████░░░  │     │ │
│  │    Kampala, Jinja Rd       │  │    │    72%       │     │ │
│  │                            │  │    └─────────────┘     │ │
│  │    Speed: 45 km/h          │  │    SoH: 95%            │ │
│  │    Heading: 180° (S)       │  │    Est. Range: 216 km  │ │
│  │    Updated: 2 min ago      │  │    Temp: 32°C          │ │
│  └────────────────────────────┘  └────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────┐  ┌────────────────────────┐ │
│  │    TODAY'S TRIPS           │  │      DRIVER            │ │
│  │                            │  │                        │ │
│  │    🟢 Trip 1: 06:00-07:30  │  │    👤 John Kato        │ │
│  │       28.5 km · 35 km/h    │  │    📞 +256772111111    │ │
│  │                            │  │    📧 john@kiira.com   │ │
│  │    🟢 Trip 2: 08:00-09:15  │  │    📋 License: DL001   │ │
│  │       22.1 km · 38 km/h    │  │                        │ │
│  │                            │  │  [Change Driver]       │ │
│  │    🔵 Trip 3: 10:00-ongoing│  │                        │ │
│  │       15.2 km so far       │  └────────────────────────┘ │
│  │                            │                              │
│  │    Total today: 65.8 km    │  ┌────────────────────────┐ │
│  │    [View All Trips →]      │  │    VEHICLE INFO        │ │
│  └────────────────────────────┘  │                        │ │
│                                  │  Odometer: 15,234 km  ││
│                                  │  Battery: 250 kWh     ││
│                                  │  Max Range: 300 km    ││
│                                  │  Depot: Kampala Cent.  ││
│                                  │  Device: teltonika-abc ││
│                                  └────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Vehicle Detail — Battery Tab

```
┌─────────────────────────────────────────────────────────────┐
│  [Overview] [Location] [Battery] [Trips] [Maint.] [Settings]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              BATTERY LEVEL GAUGE                     │    │
│  │                                                      │    │
│  │    ┌─────────────────────────────────────────┐       │    │
│  │    │ ████████████████████████████████         │       │    │
│  │    │ █████████████████████████████░░░░░░░░░░ │       │    │
│  │    │          72%                             │       │    │
│  │    └─────────────────────────────────────────┘       │    │
│  │                                                      │    │
│  │    🔋 Level: 72%    💪 SoH: 95%    🌡️ Temp: 32°C  │    │
│  │    ⚡ Charging: No    📏 Est. Range: 216 km          │    │
│  │    🔌 Voltage: 380V    ⚡ Current: -15.2A            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         BATTERY HISTORY (Chart.js line chart)        │    │
│  │                                                      │    │
│  │  100%│    ╭─╮        ╭──╮                            │    │
│  │   80%│───╯  ╰────╮──╯  ╰────╮                       │    │
│  │   60%│           ╰╯         ╰───╮                     │    │
│  │   40%│                          ╰──── (charging)      │    │
│  │   20%│                                                │    │
│  │      └──────────────────────────────────              │    │
│  │       00:00  04:00  08:00  12:00  16:00  20:00       │    │
│  │                                                      │    │
│  │  [Today] [7 Days] [30 Days] [90 Days]               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  CHARGING SESSIONS                                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Date       Start  End    Level    kWh    Duration    │    │
│  │─────────────────────────────────────────────────────│    │
│  │ Jun 10    22:00  06:00  15%→85%  175    8h 00m      │    │
│  │ Jun 09    22:00  05:30  20%→80%  150    7h 30m      │    │
│  │ Jun 08    22:00  06:15  12%→88%  190    8h 15m      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Vehicle Detail — Location/Tracking Tab

```
┌─────────────────────────────────────────────────────────────┐
│  [Overview] [Location] [Battery] [Trips] [Maint.] [Settings]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [▶ Live] [◼ Pause]   Show trail: [Last 1h ▼]  [Fullscreen]│
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │              FULL MAP VIEW                            │    │
│  │         (Leaflet/OpenStreetMap)                       │    │
│  │                                                      │    │
│  │    ╭──────────────────╮                               │    │
│  │    │ Route trail line │  📍 Current position          │    │
│  │    ╰──────────────────╯    (pulsing marker)           │    │
│  │                                                      │    │
│  │    📍 Last: 2 min ago                                │    │
│  │    Speed: 45 km/h · Heading: S                       │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │ GEOFENCE              │  │ RECENT POSITIONS             │ │
│  │                       │  │                              │ │
│  │ Zone: Kampala Central │  │ ● 14:30  Jinja Rd, 45km/h   │ │
│  │ Radius: 15 km         │  │ ● 14:25  Entebbe Rd, 38km/h │ │
│  │ [Edit Geofence]       │  │ ● 14:20  Kampala Rd, 42km/h │ │
│  │                       │  │ ● 14:15  Jinja Rd, 40km/h   │ │
│  │ ✅ Inside zone        │  │ ● 14:10  Kampala Rd, 35km/h │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Alerts Page

```
┌─────────────────────────────────────────────────────────────┐
│  Alerts                                          [Settings]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Filter: [All Types ▾] [All Severity ▾] [Last 7 days ▾]    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ⚠️ WARNING   Kayoola-003 · 18% battery              │    │
│  │              Battery level below threshold (20%)      │    │
│  │              2 hours ago          [Acknowledge]       │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ 🔴 CRITICAL  Kayoola-007 · Offline                  │    │
│  │              No signal for 45 minutes                 │    │
│  │              1 hour ago           [Acknowledge]       │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ℹ️ INFO      Kayoola-012 · Maintenance Due          │    │
│  │              Routine maintenance scheduled for Jun 15 │    │
│  │              Today 09:00          [Acknowledge]       │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ⚠️ WARNING   Kayoola-015 · 15% battery              │    │
│  │              30 min ago            [Acknowledge]      │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ✅ RESOLVED  Kayoola-003 · Battery recharged         │    │
│  │              30 min ago           ✓ Admin 2h ago     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Alert Settings                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Type               Threshold  Email  SMS   In-App    │    │
│  │─────────────────────────────────────────────────────│    │
│  │ Low Battery        < 20%       ✅    ❌    ✅       │    │
│  │ Offline            > 30 min    ✅    ❌    ✅       │    │
│  │ Maintenance Due    7 days      ✅    ❌    ✅       │    │
│  │ Geofence Exit      On exit     ✅    ❌    ✅       │    │
│  │ High Temperature   > 45°C      ✅    ❌    ✅       │    │
│  │ Rapid Battery Drop > 10%/15min ❌    ❌    ✅       │    │
│  │                                                     │    │
│  │                                         [Save]      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Reports Page

```
┌─────────────────────────────────────────────────────────────┐
│  Reports                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Period: [Last 30 Days ▾]  From: [May 12] To: [Jun 11]    │
│                                              [Export CSV]   │
│                                              [Export PDF]   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ FLEET SUMMARY                                        │    │
│  │                                                      │    │
│  │ 📊 Distance Covered (bar chart, per vehicle)         │    │
│  │ ████████████████████ Kayoola-001  2,100 km           │    │
│  │ ██████████████████   Kayoola-002  1,950 km           │    │
│  │ █████████████████    Kayoola-003  1,800 km           │    │
│  │ ...                                                  │    │
│  │ Total: 45,230 km                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 💰 COST SAVINGS                                      │    │
│  │                                                      │    │
│  │ Fuel Saved:        12,500 liters                     │    │
│  │ Cost Saved:        UGX 68,750,000                    │    │
│  │ CO₂ Reduced:       33,500 kg                         │    │
│  │ Maintenance Saved: UGX 5,000,000                     │    │
│  │                                                      │    │
│  │ 📈 Trend (line chart, monthly)                       │    │
│  │ 2.0M│          ╭──╮                                  │    │
│  │ 1.5M│     ╭──╮ │  │  ╭──╮                            │    │
│  │ 1.0M│╭──╮ │  │ │  │  │  │                             │    │
│  │ 0.5M││  │ │  │ │  │  │  │                             │    │
│  │     └┴──┴─┴──┴┴──┴──┴──┴─                            │    │
│  │      Jan  Feb  Mar  Apr  May  Jun                    │    │
│  │      (UGX saved per month)                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ⚡ ENERGY CONSUMPTION                                │    │
│  │ Total: 8,500 kWh from grid                           │    │
│  │ Avg per bus: 354 kWh/month                           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. User Flow Diagrams

### Flow 1: First-Time Setup
```
Login → Dashboard (empty, "Add your first vehicle" CTA)
      → Add Vehicle → Fill form → Save
      → Add Driver → Fill form → Save
      → Assign Driver to Vehicle
      → Dashboard shows vehicle with status
      → (Optional) Generate Telemetry API Key → Give to GPS device installer
      → Telemetry data starts flowing → Dashboard updates
```

### Flow 2: Daily Monitoring
```
Login → Dashboard
      → Check summary cards (any issues?)
      → Scan alert panel (any new alerts?)
      → Acknowledge alerts
      → Check map (where are buses?)
      → Click on alert vehicle → Vehicle Detail
      → Check battery tab (is it critical?)
      → Check location tab (where exactly?)
      → Take action: call driver / schedule maintenance
```

### Flow 3: Report Generation
```
Login → Reports
      → Select date range
      → View fleet summary charts
      → Export PDF
      → Share with management
```

---

## 12. Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#2563EB` | Buttons, links, active states |
| `--primary-dark` | `#1D4ED8` | Hover states |
| `--success` | `#16A34a` | Active/OK status |
| `--warning` | `#F59E0B` | Warning alerts, medium battery |
| `--danger` | `#DC2626` | Critical alerts, low battery |
| `--info` | `#0EA5E9` | Info, charging status |
| `--gray-50` | `#F9FAFB` | Page background |
| `--gray-100` | `#F3F4F6` | Card backgrounds |
| `--gray-200` | `#E5E7EB` | Borders |
| `--gray-500` | `#6B7280` | Secondary text |
| `--gray-900` | `#111827` | Primary text |

### Status Colors
| Status | Color | Hex |
|--------|-------|-----|
| IN_TRANSIT | Green | `#16A34A` |
| CHARGING | Blue | `#2563EB` |
| IDLE | Gray | `#6B7280` |
| MAINTENANCE | Purple | `#7C3AED` |
| ALERT | Red/Orange | `#DC2626` |
| OFFLINE | Dark Gray | `#374151` |

### Typography
| Element | Size | Weight |
|---------|------|--------|
| Page title | 24px | Bold (700) |
| Card value | 32px | Bold (700) |
| Card label | 14px | Medium (500) |
| Body text | 14px | Regular (400) |
| Table header | 12px | Semibold (600) |
| Table cell | 14px | Regular (400) |
| Button | 14px | Medium (500) |
| Sidebar nav | 14px | Medium (500) |

### Spacing
- Card padding: 16px
- Section gap: 24px
- Sidebar width: 240px (desktop), collapsed to 56px (mobile)
- Content max-width: 1200px

### Breakpoints
| Breakpoint | Width |
|------------|-------|
| Mobile | 0 – 639px |
| Tablet | 640px – 1023px |
| Desktop | 1024px+ |
