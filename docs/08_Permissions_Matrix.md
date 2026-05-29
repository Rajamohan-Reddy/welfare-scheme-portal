# Permissions Matrix

| Feature                    | Citizen | Officer | Admin |
| -------------------------- | ------- | ------- | ----- |
| Register                   | YES     | NO      | NO    |
| Login                      | YES     | YES     | YES   |
| View Schemes               | YES     | YES     | YES   |
| Search Schemes             | YES     | YES     | YES   |
| Apply For Scheme           | YES     | NO      | NO    |
| Upload Documents           | YES     | NO      | NO    |
| View Own Applications      | YES     | NO      | NO    |
| Edit Own Application       | YES     | NO      | NO    |
| Delete Own Application     | YES     | NO      | NO    |
| View Assigned Applications | NO      | YES     | YES   |
| Verify Application         | NO      | YES     | YES   |
| Request Correction         | NO      | YES     | YES   |
| Approve Application        | NO      | YES     | YES   |
| Reject Application         | NO      | YES     | YES   |
| Add Remarks                | NO      | YES     | YES   |
| Create Scheme              | NO      | NO      | YES   |
| Update Scheme              | NO      | NO      | YES   |
| Disable Scheme             | NO      | NO      | YES   |
| Create Officer             | NO      | NO      | YES   |
| Manage Officers            | NO      | NO      | YES   |
| View Dashboard             | YES     | YES     | YES   |
| View Reports               | NO      | YES     | YES   |
| View Audit Logs            | NO      | NO      | YES   |

---

# Authorization Strategy

Every protected endpoint must validate:

1. JWT Token

2. User Authentication

3. User Role

4. Permission Access

---

# Middleware Usage

Authentication Middleware

Validates:

- JWT Token
- User Existence

---

Authorization Middleware

Validates:

- Citizen Access
- Officer Access
- Admin Access

Example:

Admin Only Routes

Create Scheme

Delete Scheme

Manage Officers

View Audit Logs

---

# Security Principle

Users should only access resources they own or are authorized to manage.

Examples:

Citizen

Can only view own applications.

Cannot view another citizen's application.

---

Officer

Can only manage assigned applications.

---

Admin

Can access all records.
