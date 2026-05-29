# Dashboard Requirements

## Overview

The Welfare Scheme Portal provides separate dashboards for:

1. Citizen
2. Officer
3. Admin

Each dashboard displays relevant statistics, charts, recent activities, and application information.

---

# Citizen Dashboard

## Purpose

Allows citizens to monitor their welfare applications and status.

---

## Dashboard Cards

### Total Applications

Shows total applications submitted by the citizen.

---

### Approved Applications

Shows total approved applications.

---

### Rejected Applications

Shows total rejected applications.

---

### Pending Applications

Shows applications currently under verification.

---

## Pie Chart

### My Applications Status Distribution

Displays:

- Approved
- Rejected
- Under Verification
- Correction Required

Example:

Approved → 5

Rejected → 2

Under Verification → 3

Correction Required → 1

---

## Recent Applications Table

Columns:

- Application Number
- Scheme Name
- Status
- Submitted Date

---

# Officer Dashboard

## Purpose

Allows officers to manage verification workload.

---

## Dashboard Cards

### Assigned Applications

Total applications assigned to officer.

---

### Pending Verification

Applications waiting for review.

---

### Approved Today

Applications approved today.

---

### Rejected Today

Applications rejected today.

---

## Pie Chart

### Application Status Distribution

Displays:

- Under Verification
- Verified
- Approved
- Rejected

---

## Bar Chart

### Daily Processing Statistics

Shows number of applications processed per day.

Example:

Monday → 20

Tuesday → 15

Wednesday → 25

Thursday → 30

Friday → 18

---

## Assigned Applications Table

Columns:

- Application Number
- Applicant Name
- Scheme Name
- Current Status
- Submitted Date

---

# Admin Dashboard

## Purpose

Provides complete system overview.

---

## Dashboard Cards

### Total Citizens

Total registered citizens.

---

### Total Officers

Total officers in system.

---

### Total Schemes

Active welfare schemes.

---

### Total Applications

Total submitted applications.

---

### Approved Applications

Total approved applications.

---

### Rejected Applications

Total rejected applications.

---

### Pending Verification

Applications currently under review.

---

## Pie Chart

### Application Status Distribution

Displays:

- Approved
- Rejected
- Under Verification
- Correction Required

---

## Bar Chart

### Scheme Wise Applications

Shows applications count by scheme.

Example:

Amma Vodi → 250

Old Age Pension → 180

Scholarship → 150

Housing Scheme → 95

---

## Monthly Trend Chart

Displays:

Applications submitted per month.

Example:

January → 120

February → 145

March → 210

April → 180

---

## Recent Applications Table

Columns:

- Application Number
- Applicant
- Scheme
- Status
- Officer
- Submitted Date

---

# Dashboard API Requirements

Citizen Dashboard

GET

/api/v1/dashboard/citizen

---

Officer Dashboard

GET

/api/v1/dashboard/officer

---

Admin Dashboard

GET

/api/v1/dashboard/admin

---

# Dashboard Data Source

Dashboard values must always be generated from database records.

Never store dashboard counts separately.

All charts and statistics must be calculated dynamically.
