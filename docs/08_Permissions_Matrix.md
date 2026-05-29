# Permissions Matrix

| Feature                    | Citizen | Officer | Admin |
| -------------------------- | ------- | ------- | ----- |
| Register Account           | YES     | NO      | NO    |
| Login                      | YES     | YES     | YES   |
| View Profile               | YES     | YES     | YES   |
| Update Profile             | YES     | YES     | YES   |
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
| View Notifications         | YES     | YES     | YES   |
| Create Scheme              | NO      | NO      | YES   |
| Update Scheme              | NO      | NO      | YES   |
| Disable Scheme             | NO      | NO      | YES   |
| View Users                 | NO      | NO      | YES   |
| Create Admin               | NO      | NO      | YES   |
| Create Officer             | NO      | NO      | YES   |
| Activate User              | NO      | NO      | YES   |
| Deactivate User            | NO      | NO      | YES   |
| View Reports               | NO      | YES     | YES   |
| View Dashboard             | YES     | YES     | YES   |
| View Audit Logs            | NO      | NO      | YES   |

---

# User Creation Rules

Citizen

- Self Registration

Officer

- Created By Admin

Admin

- Seed Process
- Created By Existing Admin

---

# Resource Ownership Rules

Citizen:

Can only access their own applications.

Officer:

Can only access applications assigned to them.

Admin:

Can access all records.

---

# Security Principle

Least Privilege Access.

Every role receives only the permissions necessary to perform its responsibilities.
