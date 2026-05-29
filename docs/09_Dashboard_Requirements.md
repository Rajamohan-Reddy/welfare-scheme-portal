# Dashboard Requirements

## Overview

The portal provides dashboards for:

1. Citizen
2. Officer
3. Admin

Dashboard data is generated dynamically from database records.

---

# Citizen Dashboard

## Statistics Cards

- Total Applications
- Approved Applications
- Rejected Applications
- Pending Applications

---

## Pie Chart

My Application Status Distribution

Statuses:

- Approved
- Rejected
- Under Verification
- Correction Required

---

## Recent Applications Table

Columns:

- Application Number
- Scheme Name
- Status
- Submitted Date

---

# Officer Dashboard

## Statistics Cards

- Assigned Applications
- Pending Verification
- Approved Applications
- Rejected Applications

---

## Pie Chart

Verification Status Distribution

---

## Bar Chart

Daily Application Processing

Columns:

- Date
- Applications Processed

---

## Applications Table

Columns:

- Application Number
- Applicant Name
- Scheme Name
- Status
- Submitted Date

---

# Admin Dashboard

## Statistics Cards

- Total Users
- Total Admins
- Total Officers
- Total Citizens
- Active Users
- Inactive Users
- Total Schemes
- Total Applications

---

## Pie Chart

Application Status Distribution

Statuses:

- Approved
- Rejected
- Under Verification
- Correction Required

---

## Bar Chart

Scheme Wise Applications

Examples:

- Amma Vodi
- Pension Scheme
- Scholarship Scheme
- Housing Scheme

---

## Monthly Trend Chart

Applications Submitted Per Month

---

## Recent Applications Table

Columns:

- Application Number
- Applicant Name
- Scheme Name
- Assigned Officer
- Status
- Submitted Date

---

# Dashboard APIs

Citizen Dashboard

GET /api/v1/dashboard/citizen

---

Officer Dashboard

GET /api/v1/dashboard/officer

---

Admin Dashboard

GET /api/v1/dashboard/admin

---

# Analytics Strategy

Dashboard values are generated using MongoDB Aggregation Pipelines.

Dashboard data is never stored separately.
