# Database Design

## Collections

### users

Stores all system users.

Fields:

- firstName
- lastName
- email
- password
- phoneNumber
- aadhaarNumber
- dateOfBirth
- gender
- address
- profileImage
- role
- refreshToken
- isActive
- isProfileCompleted
- createdBy
- lastLoginAt
- passwordChangedAt
- deactivatedAt

Indexes:

- email
- phoneNumber
- aadhaarNumber (sparse)
- role
- isActive

---

### schemecategories

Stores scheme categories.

Fields:

- categoryCode
- categoryName
- description
- isActive

---

### schemes

Stores welfare schemes.

Fields:

- schemeCode
- schemeName
- description
- department
- benefitType
- benefitAmount

Media:

- bannerImage
- thumbnailImage
- galleryImages
- guidelinesDocument
- governmentOrderDocument

Eligibility:

- minAge
- maxAge
- gender
- maxAnnualIncome
- casteCategories
- studentRequired
- farmerRequired
- widowRequired
- disabledRequired

Additional:

- requiredDocuments
- applicationFields
- startDate
- endDate
- isActive
- createdBy
- updatedBy

---

### applications

Stores citizen applications.

Fields:

- applicationNumber
- citizenId
- schemeId
- status
- applicantRemarks
- officerRemarks
- rejectionReason
- documents
- dynamicFormData
- submittedAt
- approvedAt
- rejectedAt
- verifiedBy
- approvedBy

Status Flow:

SUBMITTED

↓

DOCUMENT_VERIFIED

↓

FIELD_VERIFIED

↓

APPROVED

↓

PAID

OR

REJECTED

---

### verificationhistories

Tracks all verification activities.

Fields:

- applicationId
- action
- remarks
- previousStatus
- currentStatus
- performedBy

---

### payments

Stores beneficiary payments.

Fields:

- applicationId
- beneficiaryId
- schemeId
- amount
- transactionReference
- paymentDate
- paymentStatus
- processedBy
- remarks

Payment Status:

- PENDING
- SUCCESS
- FAILED

---

### notifications

Stores user notifications.

Fields:

- userId
- title
- message
- referenceType
- referenceId
- isRead

Reference Types:

- APPLICATION
- PAYMENT

---

### auditlogs

Stores system audit trail.

Fields:

- module
- action
- entityId
- performedBy
- description
- metadata
- ipAddress

Modules:

- AUTH
- SCHEME
- APPLICATION
- VERIFICATION
- PAYMENT
