# User Roles and Permissions

## Citizen

The citizen is the primary user of the portal.

Permissions:

✓ Register

✓ Login

✓ View Available Schemes

✓ Search Schemes

✓ Apply for Welfare Schemes

✓ Upload Required Documents

✓ Edit Application Before Verification

✓ Delete Application Before Verification

✓ Track Application Status

✓ View Application History

---

## Officer

The officer is responsible for application processing and verification.

Permissions:

✓ Login

✓ View Assigned Applications

✓ Verify Documents

✓ Review Applicant Details

✓ Request Corrections

✓ Approve Applications

✓ Reject Applications

✓ Add Verification Remarks

✓ View Verification History

---

## Admin

The administrator manages the complete system.

Permissions:

✓ Login

✓ Manage Welfare Schemes

✓ Create Schemes

✓ Update Schemes

✓ Disable Schemes

✓ Manage Officers

✓ View Dashboard Analytics

✓ View Reports

✓ View Audit Logs

✓ Monitor Application Processing

✓ Access System Statistics

---

# Security Rules

## Citizen

Cannot:

- Approve Applications
- Reject Applications
- Manage Schemes
- Manage Officers

---

## Officer

Cannot:

- Manage Officers
- Manage System Settings

---

## Admin

Has Full System Access

Except direct database access.

Database operations must always go through application APIs.

---

# Role-Based Access Control (RBAC)

The system implements Role-Based Access Control (RBAC).

Access is granted based on the authenticated user's role.

Every protected API endpoint validates:

1. JWT Token
2. User Authentication
3. User Authorization
4. Role Permission

Unauthorized users will receive:

HTTP 401 - Unauthorized

HTTP 403 - Forbidden
