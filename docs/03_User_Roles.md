# User Roles and Permissions

## Overview

The Welfare Scheme Portal uses Role-Based Access Control (RBAC).

The system contains three roles:

- ADMIN
- OFFICER
- CITIZEN

Each role has specific responsibilities and permissions.

---

# Citizen

Citizens are beneficiaries of welfare schemes.

Citizens can self-register using the public registration page.

Role assigned automatically:

CITIZEN

## Permissions

✓ Register Account

✓ Login

✓ View Schemes

✓ Search Schemes

✓ View Scheme Details

✓ Apply For Schemes

✓ Upload Documents

✓ Edit Application Before Verification

✓ Delete Application Before Verification

✓ Track Application Status

✓ View Application History

✓ View Notifications

✓ Update Profile

---

## Restrictions

Citizens cannot:

✗ Create Admin Accounts

✗ Create Officer Accounts

✗ Manage Users

✗ Create Schemes

✗ Verify Applications

✗ Approve Applications

✗ Reject Applications

✗ Access Audit Logs

---

# Officer

Officers are responsible for application verification and processing.

Officers cannot self-register.

Officer accounts are created only by Admin users.

## Permissions

✓ Login

✓ View Assigned Applications

✓ Review Application Details

✓ Verify Documents

✓ Verify Eligibility

✓ Request Corrections

✓ Approve Applications

✓ Reject Applications

✓ Add Verification Remarks

✓ View Notifications

✓ Update Profile

---

## Restrictions

Officers cannot:

✗ Create Admin Accounts

✗ Create Officer Accounts

✗ Manage Users

✗ Create Schemes

✗ Delete Schemes

✗ Access Audit Logs

---

# Admin

Admins manage the complete system.

The first Admin account is created through a seed process.

Additional Admins can only be created by existing Admin users.

Admins cannot self-register.

## Permissions

✓ Login

✓ Create Admin Accounts

✓ Create Officer Accounts

✓ View Users

✓ Activate Users

✓ Deactivate Users

✓ Manage Schemes

✓ Create Schemes

✓ Update Schemes

✓ Disable Schemes

✓ View Dashboard Analytics

✓ View Reports

✓ View Audit Logs

✓ View Notifications

✓ Monitor Application Processing

✓ Update Profile

---

# User Management Rules

## Admin Creation

First Admin:

Created through seed process.

Additional Admins:

Created by existing Admin users.

---

## Officer Creation

Created only by Admin users.

---

## Citizen Registration

Self-registration allowed.

Role assigned automatically:

CITIZEN

---

# Account Status

Users are never permanently deleted.

Account Status:

isActive = true

or

isActive = false

Inactive users cannot login or access protected APIs.

---

# Security Rules

Every protected API validates:

1. JWT Token
2. Authentication
3. Authorization
4. Role Permission

Unauthorized Requests:

HTTP 401

Forbidden Actions:

HTTP 403
