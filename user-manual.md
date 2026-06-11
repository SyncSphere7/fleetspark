# FleetSpark — User Manual

**Version:** 1.0  
**Date:** June 11, 2026  
**Audience:** Fleet managers, admins, drivers using FleetSpark

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard](#dashboard)
3. [Managing Vehicles](#managing-vehicles)
4. [Managing Bikes](#managing-bikes)
5. [Managing Drivers](#managing-drivers)
6. [Battery Monitoring](#battery-monitoring)
7. [Trip History](#trip-history)
8. [Maintenance Scheduling](#maintenance-scheduling)
9. [Alerts & Notifications](#alerts--notifications)
10. [Reports](#reports)
11. [Settings](#settings)
12. [Roles & Permissions](#roles--permissions)
13. [GPS Device Setup](#gps-device-setup)
14. [FAQ](#faq)

---

## Getting Started

### Creating Your Account
1. Navigate to `https://fleetspark.syncspherellc.com`
2. Click **"Sign Up"**
3. Enter your organization name, your name, email, and password
4. You'll be the **Admin** of your organization
5. You'll land on the Dashboard

### Inviting Team Members
1. Go to **Settings → Users**
2. Click **"Invite User"**
3. Enter their email and select a role:
   - **Admin** — Full control, can manage users and billing
   - **Fleet Manager** — Can manage vehicles, drivers, and view all data
   - **Driver** — Can only see their assigned vehicle
   - **Viewer** — Read-only access to dashboard and reports
4. They'll receive an email invitation to set their password

### First-Time Setup Checklist
- [ ] Create your account
- [ ] Invite team members
- [ ] Set up your organization profile (Settings → Organization)
- [ ] Add vehicles
- [ ] Add drivers
- [ ] Assign drivers to vehicles
- [ ] Set up GPS devices (or use demo mode)
- [ ] Configure alert thresholds (Settings → Alerts)
- [ ] Test the dashboard

---

## Dashboard

The dashboard is your home screen. It gives you a real-time overview of your entire fleet.

### What You See

**Summary Cards (top):**
- **Total Vehicles** — All active vehicles in your fleet
- **Active Now** — Vehicles currently in transit (% of fleet)
- **Charging** — Vehicles currently plugged in
- **In Maintenance** — Vehicles scheduled for or undergoing maintenance
- **Alerts** — Unacknowledged alerts requiring attention

**Fleet Map:**
- Each vehicle appears as a colored dot
- **Green** = In Transit | **Blue** = Charging | **Gray** = Idle
- **Red** = Has an alert | **Purple** = Maintenance | **Dark** = Offline
- Click any dot to see vehicle details
- Use the legend to understand colors

**Alert Panel:**
- Shows the latest unacknowledged alerts
- Click **"View All"** to see the full alerts page
- Red = Critical, Orange = Yellow = Warning, Blue = Info

**Vehicle List:**
- Table of all vehicles with key info
- Search by name or plate number
- Filter by status (transit, charging, idle, etc.)
- Click any row to open the Vehicle Detail page

### Understanding Vehicle Status

| Status | Icon | What It Means |
|--------|------|---------------|
| In Transit | 🟢 | Vehicle is moving |
| Charging | 🔵 | Vehicle is plugged in and charging |
| Idle | ⚪ | Vehicle is parked, not charging |
| Maintenance | 🟣 | Vehicle is in the workshop |
| Alert | 🔴 | Vehicle has an active alert |
| Offline | ⚫ | No GPS signal received in 30+ minutes |

---

## Managing Vehicles

### Adding a Vehicle
1. Click **"Vehicles"** in the sidebar
2. Click **"Add Vehicle"** button
3. Fill in the required fields:
   - **Name** — e.g., "Kayoola-001" (your internal name)
   - **Plate Number** — e.g., "UAX 123A"
   - **VIN** — Vehicle Identification Number (optional but recommended)
   - **Model** — e.g., "Kayoola EVS"
   - **Year** — e.g., 2025
   - **Type** — Select from: Bus, Coach, Car, Van, Truck
   - **Battery Capacity (kWh)** — e.g., 250
   - **Max Range (km)** — e.g., 300
   - **Depot** — Where the vehicle is based (optional)
4. Click **"Save"**

### Editing a Vehicle
1. Click on the vehicle row in the list
2. Go to the **"Settings"** tab
3. Click **"Edit"**
4. Update any field
5. Click **"Save"**

### Assigning a GPS Device
1. In Vehicle Settings, find the **Device ID** field
2. Enter the ID of your GPS device (e.g., "teltonika-abc123")
3. Make sure the device is already sending telemetry (see [GPS Device Setup](#gps-device-setup))
4. Once telemetry is received, the vehicle will appear on the map

### Deactivating a Vehicle
1. In Vehicle Settings, toggle **"Active"** to off
2. The vehicle will be hidden from the main list but data is preserved
3. To reactivate, toggle back on

### Vehicle Detail Page
Click any vehicle to see its detail page with tabs:

**Overview Tab:**
- Current location on mini-map
- Current battery level, SoH, estimated range
- Today's trips summary
- Assigned driver info
- Vehicle info (odometer, battery capacity, etc.)

**Location Tab:**
- Full-size map with the vehicle's current position
- Route trail showing where it's been (last 1 hour by default)
- Change time range: Last 1h, 6h, 24h, 7 days
- Geofence status (if configured)

**Battery Tab:**
- Large battery gauge showing current level
- State of Health (SoH) percentage
- Estimated remaining range
- Battery history chart (last 24h, 7 days, 30 days, 90 days)
- Charging sessions table with dates, levels, and energy consumed

**Trips Tab:**
- List of all trips with date, distance, duration, avg speed
- Click a trip to see the route on a map
- Filter by date range

**Maintenance Tab:**
- Upcoming maintenance (next 30 days)
- Maintenance history
- **"Schedule Maintenance"** button to add new

**Settings Tab:**
- Edit vehicle info
- Configure max range (for accurate range estimates)
- Configure alert thresholds for this specific vehicle

---

## Managing Bikes

Bikes (e-bodas, e-motorcycles) are managed similarly to vehicles but with bike-specific fields.

### Adding a Bike
1. Click **"Vehicles"** → **"Add Vehicle"**
2. Select **Type: Bike** (or "Motorcycle")
3. Fill in:
   - **Name** — e.g., "Spiro-001"
   - **Plate Number** — e.g., "UAX 500M"
   - **Model** — e.g., "Spiro Max"
   - **Battery Capacity (kWh)** — e.g., 2.5 (much smaller than buses)
   - **Max Range (km)** — e.g., 80
4. Click **"Save"**

### Bike-Specific Features
- **Battery swap tracking:** FleetSpark detects when a battery swap occurs ( sudden level jump from low to high)
- **Swappable battery ID:** Optionally assign a battery ID to track individual batteries
- **Smaller battery gauge:** UI adapts to show appropriate range for bikes
- **Bike on map:** Shown with a motorcycle icon (🏍️) vs bus icon (🚌)

### Managing a Bike Fleet
Bikes appear alongside vehicles in the dashboard. Use the **Type filter** to show only bikes.

For large bike fleets (100+):
- Use the **search** function to find specific bikes
- **Bulk import** via CSV (admin feature in v2)
- Assign **battery swap stations** as sub-locations

### Battery Swap Detection
FleetSpark automatically detects battery swaps:
1. Battery level drops to <10%
2. Suddenly jumps to >90% within 5 minutes (without charging status)
3. System logs a "Battery Swap" event
4. Visible in the Battery tab as a swap marker

---

## Managing Drivers

### Adding a Driver
1. Click **"Drivers"** in the sidebar
2. Click **"Add Driver"**
3. Fill in:
   - **Name** — Full name
   - **Phone** — With country code (e.g., +256...)
   - **Email** — Optional
   - **License Number** — Optional
   - **License Expiry Date** — Optional
4. Click **"Save"**

### Assigning a Driver to a Vehicle
1. Open the **Driver Detail** page
2. Click **"Assign to Vehicle"**
3. Select the vehicle from the dropdown
4. Click **"Confirm"**
5. The driver will now appear on the vehicle's detail page

### Reassigning a Driver
1. Open the **Vehicle Detail** page
2. Click **"Change Driver"** in the driver section
3. Select a new driver or choose **"Unassign"**
4. Click **"Confirm"**

### Driver View
When a driver logs in:
- They only see their assigned vehicle(s)
- They can see current battery level and estimated range
- They can update their location manually (if no GPS device)
- They cannot see other vehicles or fleet analytics

---

## Battery Monitoring

### Understanding Battery Level
- **Gauge:** Visual indicator from 0% to 100%
- **Color coded:** Green (>50%), Yellow (20-50%), Red (<20%)
- **Estimated Range:** Calculated from battery level × max range

### Understanding State of Health (SoH)
- **SoH** measures battery degradation over time
- **100%** = Brand new battery
- **80%** = Battery has degraded 20% (needs monitoring)
- **<70%** = Battery replacement recommended
- SoH naturally decreases with charge cycles

### Charging Sessions
A charging session is recorded when:
1. Vehicle reports `charging: true`
2. Vehicle reports `charging: false`
3. System calculates: duration, start/end level, estimated energy consumed

### Low Battery Alerts
- Default threshold: **20%**
- Configurable in **Settings → Alerts**
- Notifications: In-app, email, or SMS
- Acknowledge the alert to clear it from the active list

### Battery History Chart
- View battery level over time
- Toggle: 24 hours, 7 days, 30 days, 90 days
- Charging periods highlighted in blue
- Useful for identifying battery degradation patterns

---

## Trip History

### What is a Trip?
A trip is automatically recorded when:
1. The vehicle starts moving (ignition on / speed > 0)
2. The vehicle stops for more than 5 minutes (ignition off)

### Trip Data
- **Start/End time** — When the trip began and ended
- **Start/End location** — GPS coordinates and reverse-geocoded address
- **Distance** — Kilometers covered (from GPS)
- **Duration** — Total time in minutes
- **Average speed** — Mean speed during the trip
- **Maximum speed** — Highest speed recorded

### Viewing Trip Route
1. Open a trip from the list
2. Click **"Show Route"**
3. The map displays the exact path taken
4. Colored by speed (green = fast, red = slow)

### Export Trips
1. Go to **Reports**
2. Select **Trip Export**
3. Choose date range
4. Click **"Export CSV"**

---

## Maintenance Scheduling

### Creating a Maintenance Record
1. Open the **Vehicle Detail** → **Maintenance** tab
2. Click **"Schedule Maintenance"**
3. Fill in:
   - **Type:** Routine, Repair, Inspection, Battery Service, Tire, Brake, Other
   - **Description:** What needs to be done
   - **Scheduled Date:** When it should happen
   - **Odometer:** Current reading (optional)
4. Click **"Save"**

### Completing Maintenance
1. Open the maintenance record that's due
2. Click **"Mark Complete"**
3. Enter:
   - **Completed Date:** When it was done
   - **Cost (UGX):** How much it cost
   - **Notes:** What was done, parts replaced, etc.
4. Click **"Save"**

### Maintenance Alerts
- System generates an alert when maintenance is due
- Default: 7 days before scheduled date
- Configurable in **Settings → Alerts**

---

## Alerts & Notifications

### Alert Types

| Alert | Description | Default Trigger |
|-------|-------------|-----------------|
| **Low Battery** | Battery below threshold | < 20% |
| **Offline** | No GPS signal received | > 30 minutes |
| **Maintenance Due** | Scheduled maintenance approaching | 7 days before |
| **Geofence Exit** | Vehicle left designated area | On exit |
| **High Temperature** | Battery overheating | > 45°C |
| **Rapid Battery Drop** | Unexpected battery drain | > 10% in 15 min |

### Acknowledging Alerts
1. Click the **alert** in the panel or alerts page
2. Click **"Acknowledge"**
3. The alert moves to "Acknowledged" status
4. You can add a note explaining action taken

### Configuring Alert Thresholds
1. Go to **Settings → Alerts**
2. For each alert type, adjust:
   - **Threshold** (e.g., change low battery from 20% to 25%)
   - **Email notifications** (on/off)
   - **SMS notifications** (on/off and enter phone number)
   - **In-app notifications** (on/off)
3. Click **"Save"**

### SMS Notifications
- SMS uses Twilio (requires balance)
- Standard SMS rates apply (~UGX 150/SMS)
- Configure your phone number in **Settings → Organization**

---

## Reports

### Fleet Summary Report
Shows fleet-wide metrics for a date range:
- Total distance covered (km)
- Total trips
- Average fleet utilization (%)
- Total energy consumed (kwh)
- Total charging sessions
- Cost savings vs diesel

### Cost Savings Report
Calculates how much money you've saved by using EVs:
- **Fuel saved** = (Distance covered ÷ Average diesel km/liter)
- **Cost saved** = Fuel saved × Diesel price per liter (default: UGX 5,500)
- **CO₂ saved** = Fuel saved × Emission factor (default: 2.68 kg/liter)

### Vehicle Utilization Report
Per vehicle:
- Total distance (km)
- Number of trips
- Utilization % (time in transit vs idle)
- Energy consumed (kWh)
- Cost savings

### Exporting Reports
1. Select the report type
2. Set date range
3. Click **"Export PDF"** (formatted document) or **"Export CSV"** (raw data)
4. The file downloads to your device

---

## Settings

### Organization Settings
- **Name:** Your company/organization name
- **Address:** Physical address
- **Phone:** Contact number
- **Logo:** Upload your company logo
- **Default Diesel Price:** Used for cost savings calculations
- **Default Emission Factor:** Used for CO₂ calculations
- **Timezone:** Set to "Africa/Kampala" for Uganda

### User Management
- See all users in your organization
- Invite new users
- Change user roles
- Deactivate users

### Alert Configuration
- Set thresholds for each alert type
- Configure notification channels (email/in-app/SMS)

### Telemetry API Keys
- Generate API keys for GPS devices
- Each key is linked to your organization
- Devices use this key to send telemetry data
- If compromised, revoke and generate a new key

---

## Roles & Permissions

| Action | Admin | Fleet Manager | Driver | Viewer |
|--------|-------|--------------|--------|--------|
| View dashboard | ✅ | ✅ | Own vehicle only | ✅ |
| Add/edit vehicles | ✅ | ✅ | ❌ | ❌ |
| Delete vehicles | ✅ | ❌ | ❌ | ❌ |
| Add/edit drivers | ✅ | ✅ | ❌ | ❌ |
| Assign drivers | ✅ | ✅ | ❌ | ❌ |
| View battery data | ✅ | ✅ | Own vehicle only | ✅ |
| Acknowledge alerts | ✅ | ✅ | ❌ | ❌ |
| Configure alerts | ✅ | ❌ | ❌ | ❌ |
| View reports | ✅ | ✅ | ❌ | ✅ |
| Export data | ✅ | ✅ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ |

---

## GPS Device Setup

### Supported Devices
- **Teltonika FMB920** (recommended for vehicles)
- **Teltonika FMB120** (with CAN bus support)
- **Generic OBD-II** telematics devices that support HTTP POST
- **Smartphone app** (for manual location updates)

### Configuration Steps
1. Generate a **Telemetry API Key** in FleetSpark (Settings → Telemetry Keys)
2. Assign the device to a vehicle (Vehicle Settings → Device ID)
3. Configure the GPS device to send HTTP POST to:
   ```
   POST https://fleetspark.syncspherellc.com/api/v1/telemetry
   Headers: X-API-Key: <your_api_key>
   Body: { "deviceId": "...", "timestamp": "...", "gps": {...}, "battery": {...} }
   ```
4. Set telemetry interval to **30 seconds**
5. Verify: The vehicle should appear on the map within 1-2 minutes

### Demo / Testing Mode
If you don't have GPS hardware yet:
1. Go to **Settings → Demo Mode**
2. Click **"Generate Demo Data"**
3. System creates 5 simulated vehicles with fake GPS movement
4. Useful for testing the dashboard before hardware arrives

---

## FAQ

**Q: How often does the location update?**
A: Every 30 seconds (configurable on the GPS device).

**Q: What happens if internet is down?**
A: The GPS device buffers data and sends reconnection. FleetSpark stores last known location and shows "Offline" status.

**Q: Can I track both EVs and diesel vehicles?**
A: Yes! FleetSpark works with any vehicle type. For non-EVs, battery features are simply not shown. For EVs, you also get charging and cost savings.

**Q: Can my drivers use their phones instead of GPS hardware?**
A: Yes. The mobile web app allows drivers to manually update location. Accuracy depends on phone GPS.

**Q: How is cost savings calculated?**
A: (Distance covered in km) ÷ (your diesel vehicle's km/liter) × (diesel price per liter). Set your diesel price in Settings → Organization.

**Q: Can I see historical data from before I started using FleetSpark?**
A: No. FleetSpark only stores data from the moment you start sending telemetry. For historical data, export from your old system and import via CSV (v2 feature).

**Q: How many vehicles can I track?**
A: Up to 200 per organization on the Starter plan. Enterprise plans support unlimited vehicles.

**Q: Is my data secure?**
A: Yes. All data is encrypted in transit (HTTPS) and at rest. Each organization's data is isolated. We never share your data.

**Q: Can I white-label FleetSpark with my own branding?**
A: Yes, on the Enterprise plan. Contact us for pricing.

---

## Support

- **Email:** support@fleetspark.syncspherellc.com
- **Phone:** +1 (432) 692-0996
- **Hours:** Monday – Friday, 9AM – 6PM EAT
- **Emergency:** For critical issues (system down), call the emergency line

---

*FleetSpark v1.0 — Built by SyncSphere LLC*
