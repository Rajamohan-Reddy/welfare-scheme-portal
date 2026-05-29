# Database Design

## Database

MongoDB

---

# Collections Overview

1. users
2. schemeCategories
3. schemes
4. applications
5. applicationFormData
6. applicationDocuments
7. applicationTimeline
8. notifications
9. auditLogs

---

# Users Collection

Purpose:

Stores all Citizens, Officers, and Admins.

Fields:

- firstName
- lastName
- email
- password
- phoneNumber
- aadhaarNumber
- role
- profileImage
- isActive
- lastLoginAt

Indexes:

- email (Unique)
- aadhaarNumber (Unique)

Role Enum:

- CITIZEN
- OFFICER
- ADMIN

---

# Scheme Categories Collection

Purpose:

Groups schemes by category.

Examples:

- Education
- Pension
- Housing
- Health
- Agriculture

Fields:

- categoryCode
- categoryName
- description
- isActive

---

# Schemes Collection

Purpose:

Stores all welfare schemes.

Fields:

- schemeCode
- schemeName
- categoryId
- description
- eligibilityCriteria
- requiredDocuments
- applicationFields
- startDate
- endDate
- isActive
- createdBy

Examples:

- Amma Vodi
- Old Age Pension
- Widow Pension
- Scholarship Scheme
- Housing Scheme

---

# Applications Collection

Purpose:

Stores scheme applications submitted by citizens.

Fields:

- applicationNumber
- applicantId
- schemeId
- assignedOfficerId
- status
- currentStep
- submittedAt
- verifiedAt
- approvedAt
- rejectedAt

Application Status:

- DRAFT
- SUBMITTED
- UNDER_VERIFICATION
- CORRECTION_REQUIRED
- VERIFIED
- APPROVED
- REJECTED

---

# Application Form Data Collection

Purpose:

Stores scheme-specific form fields dynamically.

Fields:

- applicationId
- formData

Example:

{
childName,
schoolName,
class
}

---

# Application Documents Collection

Purpose:

Stores uploaded document metadata.

Files will be stored in:

backend/uploads/

Fields:

- applicationId
- documentType
- fileName
- filePath
- uploadedBy
- uploadedAt

Examples:

- Aadhaar
- Ration Card
- Income Certificate
- Photo
- Bank Passbook

---

# Application Timeline Collection

Purpose:

Tracks every application status change.

Fields:

- applicationId
- oldStatus
- newStatus
- remarks
- changedBy
- changedAt

Example:

SUBMITTED

↓

UNDER_VERIFICATION

↓

APPROVED

---

# Notifications Collection

Purpose:

Stores system notifications.

Fields:

- userId
- title
- message
- isRead

Examples:

- Application Approved
- Application Rejected
- Correction Requested

---

# Audit Logs Collection

Purpose:

Tracks system activities.

Fields:

- userId
- module
- action
- description
- ipAddress

Examples:

- LOGIN
- CREATE_SCHEME
- APPROVE_APPLICATION
