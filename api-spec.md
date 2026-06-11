# FleetSpark — API Specification

**Version:** 1.0  
**Date:** June 11, 2026  
**Base URL:** `https://api.fleetspark.syncspherellc.com`  
**Protocol:** REST + WebSocket  
**Auth:** JWT (Bearer token) + API Key (telemetry)

---

## 1. Authentication

### POST /auth/register
Register a new organization + admin user.

**Request:**
```json
{
  "orgName": "Ugandan EV manufacturers",
  "orgSlug": "kiira-motors",
  "userName": "Fleet Admin",
  "email": "admin@kiiramotors.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@kiiramotors.com",
    "name": "Fleet Admin",
    "role": "ADMIN",
    "orgId": "uuid"
  },
  "tokens": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 900
  }
}
```

### POST /auth/login
**Request:**
```json
{
  "email": "admin@kiiramotors.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": { "id": "uuid", "email": "...", "name": "...", "role": "ADMIN", "orgId": "uuid" },
  "tokens": { "accessToken": "eyJ...", "refreshToken": "eyJ...", "expiresIn": 900 }
}
```

### POST /auth/refresh
**Request:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "expiresIn": 900
}
```

### POST /auth/logout
**Headers:** `Authorization: Bearer <accessToken>`
**Response (204):** No content

---

## 2. Vehicles

**All endpoints require:** `Authorization: Bearer <accessToken>`

### GET /api/v1/vehicles
List all vehicles for the organization.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | int | 1 | Page number |
| limit | int | 25 | Items per page (max 100) |
| status | string | — | Filter by status |
| type | string | — | Filter by type |
| search | string | — | Search by name or plate |

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "ElectricBus-001",
      "plateNumber": "UAX 123A",
      "model": "electric buses",
      "type": "BUS",
      "status": "IN_TRANSIT",
      "batteryLevel": 72,
      "soh": 95,
      "estimatedRangeKm": 216,
      "lastLocation": { "lat": 0.3136, "lng": 32.5811 },
      "lastUpdate": "2026-06-11T14:30:00Z",
      "driver": { "id": "uuid", "name": "John Kato" }
    }
  ],
  "meta": {
    "total": 24,
    "page": 1,
    "limit": 25,
    "totalPages": 1
  }
}
```

### POST /api/v1/vehicles
Create a new vehicle. **Roles:** ADMIN, FLEET_MANAGER

**Request:**
```json
{
  "name": "ElectricBus-001",
  "plateNumber": "UAX 147A",
  "vin": "KIIRA202500147",
  "model": "electric buses",
  "year": 2025,
  "type": "BUS",
  "batteryCapacity": 250,
  "maxRangeKm": 300,
  "odometerKm": 0,
  "depot": "Kampala Central",
  "deviceId": "teltonika-abc123"
}
```

**Response (201):** Vehicle object

### GET /api/v1/vehicles/:id
**Response (200):** Full vehicle object with latest telemetry

```json
{
  "id": "uuid",
  "name": "ElectricBus-001",
  "plateNumber": "UAX 123A",
  "vin": "KIIRA202500123",
  "model": "electric buses",
  "year": 2025,
  "type": "BUS",
  "status": "IN_TRANSIT",
  "batteryCapacity": 250,
  "maxRangeKm": 300,
  "odometerKm": 15234.5,
  "depot": "Kampala Central",
  "deviceId": "teltonika-abc123",
  "driver": { "id": "uuid", "name": "John Kato", "phone": "+256772111111" },
  "currentTelemetry": {
    "lat": 0.3136,
    "lng": 32.5811,
    "speedKmh": 45,
    "batteryLevel": 72,
    "soh": 95,
    "estimatedRangeKm": 216,
    "charging": false,
    "temperature": 32,
    "lastUpdate": "2026-06-11T14:30:00Z"
  },
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2026-06-11T14:30:00Z"
}
```

### PUT /api/v1/vehicles/:id
Update vehicle. **Roles:** ADMIN, FLEET_MANAGER
**Request:** Partial vehicle object (only fields to update)
**Response (200):** Updated vehicle object

### DELETE /api/v1/vehicles/:id
Soft-delete vehicle. **Roles:** ADMIN only
**Response (204):** No content

### GET /api/v1/vehicles/:id/location-history
Get location history for a vehicle.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| from | ISO date | 24h ago | Start time |
| to | ISO date | now | End time |
| interval | string | 1m | Downsampling: 1m, 5m, 1h |

**Response (200):**
```json
{
  "data": [
    { "time": "2026-06-11T14:30:00Z", "lat": 0.3136, "lng": 32.5811, "speedKmh": 45 },
    { "time": "2026-06-11T14:29:00Z", "lat": 0.3130, "lng": 32.5805, "speedKmh": 42 }
  ],
  "meta": { "total": 1440, "downsampled": 288 }
}
```

---

## 3. Telemetry

### POST /api/v1/telemetry
**Auth:** API Key header `X-API-Key: <telemetry_api_key>`
**No JWT required** — this endpoint is for GPS devices.

**Rate Limit:** 1 request per 30 seconds per vehicle

**Request:**
```json
{
  "deviceId": "teltonika-abc123",
  "timestamp": "2026-06-11T14:30:00Z",
  "gps": {
    "lat": 0.3136,
    "lng": 32.5811,
    "speedKmh": 45,
    "heading": 180,
    "altitudeM": 1200
  },
  "ignition": true,
  "odometerKm": 15234.5,
  "battery": {
    "levelPct": 72,
    "sohPct": 95,
    "voltageV": 380,
    "temperatureC": 32,
    "charging": false,
    "currentA": -15.2
  }
}
```

**Response (202):**
```json
{
  "received": true,
  "vehicleId": "uuid"
}
```

**Errors:**
- `401` — Invalid API key
- `404` — Device not found / not assigned to vehicle
- `429` — Rate limit exceeded (throttle)
- `422` — Validation error

---

## 4. Drivers

### GET /api/v1/drivers
**Query:** page, limit, search, isActive
**Response:** Paginated driver list

### POST /api/v1/drivers
**Roles:** ADMIN, FLEET_MANAGER
**Request:**
```json
{
  "name": "Peter Mugisha",
  "phone": "+256772444444",
  "email": "peter@kiiramotors.com",
  "licenseNumber": "DL004",
  "licenseExpiry": "2027-12-31"
}
```

### GET /api/v1/drivers/:id
### PUT /api/v1/drivers/:id
### DELETE /api/v1/drivers/:id (soft-delete)

### POST /api/v1/drivers/:id/assign
Assign driver to vehicle.
```json
{ "vehicleId": "uuid" }
```

### POST /api/v1/drivers/:id/unassign
Unassign driver from vehicle.
**Response (200):** Updated driver object

---

## 5. Alerts

### GET /api/v1/alerts
**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | int | 1 | |
| limit | int | 25 | |
| type | string | — | Filter by alert type |
| severity | string | — | Filter by severity |
| vehicleId | string | — | Filter by vehicle |
| acknowledged | boolean | — | Filter by status |
| from | ISO date | 7d ago | |
| to | ISO date | now | |

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "LOW_BATTERY",
      "severity": "WARNING",
      "message": "ElectricBus-001 battery level at 18%",
      "vehicleId": "uuid",
      "vehicleName": "ElectricBus-001",
      "data": { "batteryLevelPct": 18 },
      "isAcknowledged": false,
      "createdAt": "2026-06-11T12:00:00Z"
    }
  ],
  "meta": { "total": 5, "page": 1, "limit": 25 }
}
```

### POST /api/v1/alerts/:id/acknowledge
**Roles:** ADMIN, FLEET_MANAGER
**Response (200):** Updated alert object

### GET /api/v1/alerts/settings
Get alert settings for the organization.

### PUT /api/v1/alerts/settings/:type
Update alert threshold for a type.
```json
{
  "threshold": { "level_pct": 25 },
  "enabled": true,
  "notifyEmail": true,
  "notifySms": false,
  "notifyInApp": true
}
```

---

## 6. Maintenance

### GET /api/v1/maintenance
**Query:** page, limit, vehicleId, type, status, from, to

### POST /api/v1/maintenance
**Request:**
```json
{
  "vehicleId": "uuid",
  "type": "ROUTINE",
  "description": "Monthly brake inspection",
  "scheduledDate": "2026-06-15T09:00:00Z",
  "odometerKm": 16000,
  "notes": "Check front brake pads"
}
```

### PUT /api/v1/maintenance/:id
Update maintenance record.

### POST /api/v1/maintenance/:id/complete
Mark maintenance as completed.
```json
{
  "completedDate": "2026-06-15T11:30:00Z",
  "costUgx": 150000,
  "notes": "Brake pads replaced"
}
```

### GET /api/v1/maintenance/upcoming
Get upcoming maintenance (next 7 days).
**Query:** vehicleId, days (default 7)

---

## 7. Trips

### GET /api/v1/trips
**Query:** page, limit, vehicleId, driverId, from, to

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "vehicleId": "uuid",
      "vehicleName": "ElectricBus-001",
      "driverName": "John Kato",
      "startTime": "2026-06-11T08:00:00Z",
      "endTime": "2026-06-11T09:30:00Z",
      "startLat": 0.3136,
      "startLng": 32.5811,
      "endLat": 0.3456,
      "endLng": 32.6123,
      "distanceKm": 28.5,
      "avgSpeedKmh": 35,
      "maxSpeedKmh": 65,
      "durationMin": 90
    }
  ],
  "meta": { "total": 156 }
}
```

### GET /api/v1/trips/:id
Full trip detail with route points.

---

## 8. Reports

### GET /api/v1/reports/fleet-summary
**Query:** from, to (default: last 30 days)

**Response (200):**
```json
{
  "period": { "from": "2026-05-11", "to": "2026-06-11" },
  "fleet": {
    "totalVehicles": 24,
    "totalDistanceKm": 45230,
    "totalTrials": 1850,
    "avgUtilizationPct": 78,
    "totalEnergyKwh": 8500,
    "totalChargingSessions": 340
  },
  "savings": {
    "fuelLitersSaved": 12500,
    "fuelCostSavedUgx": 68750000,
    "co2KgSaved": 33500,
    "maintenanceCostSavedUgx": 5000000
  },
  "vehicles": [
    {
      "id": "uuid",
      "name": "ElectricBus-001",
      "distanceKm": 2100,
      "trips": 85,
      "utilizationPct": 82,
      "energyKwh": 380,
      "fuelSavedUgx": 3100000
    }
  ]
}
```

### GET /api/v1/reports/export
**Query:** type (fleet-summary | trips | maintenance), format (csv | pdf), from, to

**Response:** File download (CSV or PDF)

---

## 9. Users (Admin only)

### GET /api/v1/users
List users in the organization.

### POST /api/v1/users/invite
Invite a new user.
```json
{
  "email": "manager@kiiramotors.com",
  "name": "Jane Manager",
  "role": "FLEET_MANAGER"
}
```

### PUT /api/v1/users/:id/role
Change user role.
```json
{ "role": "FLEET_MANAGER" }
```

### DELETE /api/v1/users/:id
Deactivate user.

---

## 10. Settings

### GET /api/v1/settings/organization
### PUT /api/v1/settings/organization
```json
{
  "name": "Ugandan EV manufacturers Corporation",
  "address": "Jinja Industrial Park, Jinja, Uganda",
  "phone": "+256414000000",
  "settings": {
    "defaultDieselPrice": 5500,
    "defaultEmissionFactor": 2.68,
    "timezone": "Africa/Kampala"
  }
}
```

### POST /api/v1/settings/telemetry-key
Generate a new telemetry API key for GPS devices.
```json
{ "name": "Teltonika Fleet A" }
```
**Response:**
```json
{
  "id": "uuid",
  "name": "Teltonika Fleet A",
  "apiKey": "fs_tel_abc123...",  // Show only once
  "createdAt": "2026-06-11T14:30:00Z"
}
```

---

## 11. WebSocket Events

**Connection:** `wss://api.fleetspark.syncspherellc.com/ws`
**Auth:** Pass JWT token as query param: `?token=<accessToken>`

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `subscribe:vehicle` | `{ vehicleId: "uuid" }` | Subscribe to real-time updates for a vehicle |
| `subscribe:fleet` | — | Subscribe to all vehicle updates in org |
| `unsubscribe:vehicle` | `{ vehicleId: "uuid" }` | Unsubscribe from vehicle |
| `ping` | — | Keep-alive |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `vehicle:location` | `{ vehicleId, lat, lng, speedKmh, batteryLevel, timestamp }` | Real-time location update |
| `vehicle:status` | `{ vehicleId, status, timestamp }` | Status change (in_transit, charging, etc.) |
| `vehicle:battery` | `{ vehicleId, levelPct, sohPct, charging, estimatedRangeKm }` | Battery update |
| `alert:new` | `{ alert: { id, type, severity, message, vehicleId, ... } }` | New alert |
| `alert:acknowledged` | `{ alertId, acknowledgedBy, acknowledgedAt }` | Alert acknowledged |
| `trip:started` | `{ tripId, vehicleId, driverId, startTime }` | Trip started |
| `trip:ended` | `{ tripId, distanceKm, durationMin }` | Trip ended |
| `pong` | — | Keep-alive response |

---

## 12. Error Format

All errors follow this structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 422 | Invalid request data |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

---

## 13. Rate Limits

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Auth | 10 requests | per minute per IP |
| API (authenticated) | 1000 requests | per minute per user |
| Telemetry | 1 request | per 30 seconds per vehicle |
| WebSocket | 1 connection | per user |

---

## 14. Pagination

All list endpoints use cursor-style pagination:

**Request:** `?page=1&limit=25`

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 25,
    "totalPages": 4
  }
}
```
