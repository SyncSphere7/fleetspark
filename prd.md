# FleetSpark — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** June 11, 2026  
**Author:** SyncSphere CEO  
**Status:** Draft — For Dev review and build

---

## 1. Product Overview

### What is FleetSpark?
FleetSpark is an **Electric Vehicle Fleet Management Platform** built for African markets, starting with Uganda. It gives fleet operators a single dashboard to track vehicles, monitor batteries, manage charging, optimize routes, and prove ROI on their EV investment.

### Why does it exist?
- Uganda has a National E-Mobility Strategy mandating full public transport electrification by 2030
- Kiira Motors is manufacturing electric buses with no management software
- Existing global solutions (Optibus, Fleetio, Geotab) are too expensive and not built for African infrastructure (Mobile Money, intermittent connectivity, local compliance)
- No local player owns this category yet

### Who is it for?
- **Primary:** Electric bus fleet operators (Kiira Motors, Tondeka Metro, KCCA)
- **Secondary:** Government agencies transitioning fleets to EV
- **Tertiary:** Logistics companies, charging station operators, inter-city coach operators
- **Expansion:** Rwanda, Kenya, Tanzania (Year 2+)

---

## 2. MVP Scope (Phase 1 — First 6 Weeks)

The MVP must be **deployable to Kiira Motors' 24-bus fleet** as a pilot. It needs to solve their top 3 problems:
1. "Where are our buses and what are they doing right now?"
2. "How healthy are our batteries and when do they need service?"
3. "What's our cost savings vs diesel buses?"

### MVP Modules (Must Have)

#### M1: Fleet Dashboard
- Real-time vehicle location on map (GPS)
- Vehicle status: `charging` | `in_transit` | `idle` | `maintenance` | `offline`
- Fleet summary cards: total vehicles, active, charging, in maintenance
- Vehicle list view with search/filter
- Click vehicle → detail page

#### M2: Battery Management
- Current battery level (%) per vehicle
- State of Health (SoH) — estimated battery degradation %
- Charge cycle count
- Estimated range remaining (km)
- Low battery alerts (configurable threshold)
- Battery history chart (last 7/30/90 days)

#### M3: Vehicle Detail Page
- Vehicle info: name, plate number, VIN, model, year, type (bus/coach/car)
- Current location + last update time
- Current trip: route, start time, distance covered
- Battery: level, SoH, estimated range, charging status
- Maintenance: next scheduled service, last service date
- Driver assignment
- Notes/log

#### M4: Alerts & Notifications
- Low battery warning (<20% default)
- Vehicle offline (>30 min no signal)
- Maintenance due (configurable interval)
- Geofence violation (vehicle leaves designated area)
- Notification channels: in-app, email, SMS (Twilio)

#### M5: User Management & Auth
- Email + password login
- Role-based access: `admin` | `fleet_manager` | `driver` | `viewer`
- Organization/multi-tenant support (each fleet operator is an org)
- Session management

### MVP — Out of Scope (Future Phases)
- Route optimization engine
- Charging station management
- Financial/TCO module
- Carbon credit tracking
- Mobile app (mobile web only for MVP)
- Battery swap scheduling
- Driver performance scoring
- Passenger-facing features
- Open API for third-party integrations

---

## 3. User Roles & Permissions

| Permission | Admin | Fleet Manager | Driver | Viewer |
|------------|-------|--------------|--------|--------|
| View dashboard | ✅ | ✅ | Own vehicle only | ✅ |
| Add/edit vehicles | ✅ | ✅ | ❌ | ❌ |
| Delete vehicles | ✅ | ❌ | ❌ | ❌ |
| Assign drivers | ✅ | ✅ | ❌ | ❌ |
| View battery data | ✅ | ✅ | Own vehicle only | ✅ |
| Configure alerts | ✅ | ✅ | ❌ | ❌ |
| View reports | ✅ | ✅ | ❌ | ✅ |
| Manage users | ✅ | ❌ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Export data | ✅ | ✅ | ❌ | ❌ |

---

## 4. Functional Requirements

### F1: Vehicle Registration
- FR-1.1: Admin can add a vehicle with: name, plate number, VIN, model, year, type, purchase date, initial odometer
- FR-1.2: Each vehicle gets a unique identifier (UUID)
- FR-1.3: Vehicles can be assigned to a depot/location
- FR-1.4: Vehicle types supported: `bus` | `coach` | `car` | `van` | `truck`
- FR-1.5: Admin can deactivate (soft-delete) a vehicle

### F2: GPS Tracking
- FR-2.1: System receives GPS telemetry via REST API endpoint (for GPS device integration)
- FR-2.2: Telemetry payload: vehicle_id, lat, lng, speed, heading, timestamp, ignition status
- FR-2.3: Location updates stored with 30-second minimum interval (throttle)
- FR-2.4: Real-time location shown on map via WebSocket push
- FR-2.5: Location history queryable by date range
- FR-2.6: Geofence: circular polygon, alert on exit
- FR-2.7: Simulated GPS data endpoint for testing/demo (no hardware needed)

### F3: Battery Monitoring
- FR-3.1: Battery data received via telemetry: vehicle_id, battery_level_pct, soh_pct, voltage, temperature, charging_status, timestamp
- FR-3.2: Estimated range calculated: `battery_level_pct * max_range_km / 100` (configurable max_range per vehicle)
- FR-3.3: Battery history stored (time-series)
- FR-3.4: Low battery alert: push notification when level < threshold (default 20%)
- FR-3.5: Charging session detection: when charging_status changes from false→true (start) and true→false (end)
- FR-3.6: Charging session record: start time, end time, start level, end level, estimated kWh consumed
- FR-3.7: SoH degradation tracked over time (linear regression on charge cycle data)

### F4: Trip Tracking
- FR-4.1: Trip auto-detected: ignition on → ignition off = one trip
- FR-4.2: Trip record: vehicle_id, driver_id, start_time, end_time, start_location, end_location, distance_km, avg_speed, max_speed
- FR-4.3: Trip list viewable per vehicle, filterable by date range
- FR-4.4: Trip shown as route line on map

### F5: Maintenance Management
- FR-5.1: Maintenance types: `routine` | `repair` | `inspection` | `battery_service` | `tire` | `brake` | `other`
- FR-5.2: Schedule maintenance by: date OR odometer reading OR engine hours
- FR-5.3: Maintenance record: vehicle_id, type, description, date, cost, odometer, status (scheduled/completed/cancelled)
- FR-5.4: Dashboard shows: upcoming maintenance (next 7/30 days), overdue
- FR-5.5: Maintenance history per vehicle

### F6: Driver Management
- FR-6.1: Admin can add drivers: name, phone, email, license_number, license_expiry
- FR-6.2: Assign/unassign driver to vehicle
- FR-6.3: Driver can only see their assigned vehicle(s)

### F7: Alerts
- FR-7.1: Alert types: `low_battery` | `offline` | `maintenance_due` | `geofence_exit` | `high_temperature` | `rapid_battery_drop`
- FR-7.2: Configurable thresholds per alert type, per organization
- FR-7.3: Alert log: all alerts history with acknowledged status
- FR-7.4: Admins/managers can acknowledge alerts
- FR-7.5: Notification channels per type: in-app (default), email, SMS

### F8: Reports
- FR-8.1: Fleet summary report (daily/weekly/monthly)
- FR-8.2: Vehicle utilization: % time in transit vs idle
- FR-8.3: Total distance covered (fleet + per vehicle)
- FR-8.4: Energy consumed (estimated kWh)
- FR-8.5: Cost savings: estimated fuel cost avoided (configurable diesel price per liter, km/l)
- FR-8.6: CO2 saved: based on fuel avoided * emission factor
- FR-8.7: Export as PDF and CSV

---

## 5. Non-Functional Requirements

### Performance
- Dashboard load: < 2 seconds (under normal load, 50 vehicles)
- Map initial render: < 3 seconds with up to 100 vehicle markers
- WebSocket latency: < 500ms for location updates
- API response: < 200ms for standard CRUD
- Support up to 200 vehicles per organization (MVP)
- Support up to 50 concurrent users

### Reliability
- 99.5% uptime target (MVP)
- Database backups: daily automated
- Graceful handling of GPS device disconnection

### Security
- JWT authentication with refresh tokens
- Passwords hashed (bcrypt)
- HTTPS only
- Rate limiting on API endpoints
- Input validation on all endpoints
- Multi-tenant data isolation (org-level)

### Localization
- English (primary, MVP)
- Swahili (Phase 2)
- French (Phase 2, for Rwanda)
- UGX currency support
- Uganda date/time format (EAT, UTC+3)

### Connectivity
- Works on intermittent connections (retry logic for telemetry send)
- Optimized for mobile web (3G-friendly)
- Minimal data transfer for map tiles (cached)

---

## 6. Telemetry Data Specification

### GPS Device → FleetSpark API

Devices send telemetry via HTTP POST to `/api/v1/telemetry`.

```json
{
  "device_id": "teltonika-fmb920-abc123",
  "vehicle_id": "uuid",
  "timestamp": "2026-06-11T14:30:00Z",
  "gps": {
    "lat": 0.3136,
    "lng": 32.5811,
    "speed_kmh": 45,
    "heading": 180,
    "altitude_m": 1200
  },
  "ignition": true,
  "odometer_km": 15234.5,
  "battery": {
    "level_pct": 72,
    "soh_pct": 95,
    "voltage_v": 380,
    "temperature_c": 32,
    "charging": false,
    "current_a": -15.2
  }
}
```

### Supported GPS Hardware (MVP)
- **Primary:** Teltonika FMB920/FMB120 (common in Africa, UART/CAN)
- **Secondary:** Generic OBD-II Bluetooth adapters with smartphone bridge
- **Fallback:** Manual location update via web UI
- **Demo:** Simulated data generator (built-in)

---

## 7. Page Specification

### P1: Login Page
- Email + password fields
- "Forgot password" link
- SyncSphere branding
- Responsive (mobile-first)

### P2: Dashboard (Home)
**Layout:** Sidebar navigation + main content area

**Summary cards (top row):**
- Total vehicles (number)
- Active now (in transit, number + % of fleet)
- Charging now (number)
- In maintenance (number)
- Alerts pending (number, clickable → alerts page)

**Map section (center):**
- OpenStreetMap with vehicle markers
- Color-coded by status: green=in_transit, blue=charging, gray=idle, red=alert, black=offline
- Click marker → vehicle popup with key info + link to detail

**Vehicle list (right panel / bottom on mobile):**
- Table: name, plate, status, battery %, last update
- Search by name or plate
- Filter by status
- Click row → vehicle detail page

### P3: Vehicle List
- Full table with all vehicles
- Columns: name, plate, type, status, battery, last update, assigned driver
- Filters: status, type, depot
- Sortable columns
- Bulk actions: export CSV
- "Add vehicle" button (admin/manager only)
- Pagination (25 per page)

### P4: Vehicle Detail
**Top section:** Vehicle name, plate, status badge, type badge

**Tabs:**
- **Overview:** Current location (mini-map), battery gauge, current speed, assigned driver, today's trips count, odometer
- **Location:** Full map with current position + trail (last 1 hour default, configurable)
- **Battery:** Current level (gauge chart), SoH, estimated range, charge history chart (line), charging sessions table
- **Trips:** Trip list (date, distance, duration, start/end location), date range filter, trip detail modal with route map
- **Maintenance:** Upcoming (next 30 days), history table, "Schedule maintenance" button
- **Settings:** Vehicle info edit, max range config, alert thresholds, assigned device

### P5: Alerts Page
- Alert list: type, vehicle, message, timestamp, status (new/acknowledged)
- Filter: type, vehicle, date range
- Acknowledge button (admin/manager)
- Alert settings sub-page: configure thresholds per type

### P6: Drivers Page
- Driver list: name, phone, email, assigned vehicle, license expiry
- "Add driver" button
- Assign/unassign vehicle
- Edit driver details

### P7: Reports Page
- Date range picker
- Report types: Fleet Summary, Vehicle Utilization, Energy Consumption, Cost Savings, CO2 Reduction
- Charts: bar, line (using Chart.js)
- Export: PDF, CSV
- Report parameters: Diesel price per liter (default: UGX 5,500), emission factor (default: 2.68 kg CO2/liter)

### P8: Settings Page
- **Organization:** Name, address, contact, logo upload
- **Users:** List, invite (email), role assignment, deactivate
- **Alert Settings:** Thresholds per alert type, notification channels
- **Integrations:** GPS device API keys, SMS gateway config
- **Billing:** Plan info, usage stats, invoices (future)

---

## 8. Success Metrics (Pilot Phase)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Dashboard uptime | >99% | Server monitoring |
| GPS data latency | <60 seconds | Last telemetry timestamp |
| Battery alert accuracy | >95% | User feedback |
| Daily active users (Kiira pilot) | >5 | Login tracking |
| Pilot retention (30 days) | 100% | Active org |
| User satisfaction | >4/5 | Survey at 30 days |

---

## 9. Open Questions

1. **GPS hardware:** Does Kiira Motors already have telematics devices installed on their buses? If yes, what brand/model?
2. **Data ownership:** Government requirement — must data be hosted in Uganda or is EC2 acceptable for pilot?
3. **Kiira contact:** Who is the right person at Kiira Motors to pitch the pilot?
4. **Uganda driving license format:** For driver management validation
5. **Kiira bus specs:** Battery capacity (kWh), range (km), charging type (CCS/CHAdeMO/wired) for accurate calculations

---

## 10. Glossary

| Term | Definition |
|------|-----------|
| SoH | State of Health — battery's current capacity vs original capacity (%) |
| Geofence | Virtual geographic boundary that triggers alerts when crossed |
| Telemetry | Data transmitted from vehicle sensors (GPS, battery, etc.) to the platform |
| CPO | Charge Point Operator — entity that operates EV charging stations |
| ICE | Internal Combustion Engine — traditional petrol/diesel vehicle |
| Depot | Vehicle parking/maintenance facility |
| OVP | Onboard Vehicle Protocol — communication standard for vehicle data |
