# Database Design

## Overview

The Welfare Scheme / Service Management Portal uses MongoDB as its primary database.

The database is designed to support:

- Role-Based Access Control (RBAC)
- Dynamic Welfare Schemes
- Application Processing Workflow
- Officer Verification Workflow
- Dashboard Analytics
- Notifications
- Audit Logging

---

# Database Collections

The system contains the following collections:

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

# Collection Relationships

users

↓

applications

↓

applicationFormData

↓

applicationDocuments

↓

applicationTimeline

---

schemeCategories

↓

schemes

↓

applications

---

users

↓

notifications

---

users

↓

auditLogs

---

# Users Collection

## Purpose

Stores all system users.

The application supports three user roles:

- ADMIN
- OFFICER
- CITIZEN

---

## User Creation Strategy

### First Admin

Created using a database seed process.

Not created through public registration.

---

### Additional Admins

Created only by existing Admin users.

---

### Officers

Created only by Admin users.

---

### Citizens

Can self-register using the public registration page.

---

## Fields

- firstName
- lastName
- email
- password
- phoneNumber
- aadhaarNumber
- role
- profileImage
- isActive
- createdBy
- lastLoginAt
- createdAt
- updatedAt

---

## Indexes

email → Unique

aadhaarNumber → Unique

role

isActive

---

## Soft Delete Strategy

Users are never physically deleted.

Instead:

isActive = false

This preserves:

- Application History
- Audit Logs
- Timeline Records

---

# Scheme Categories Collection

## Purpose

Organizes welfare schemes by category.

---

## Examples

- Education
- Pension
- Housing
- Health
- Agriculture

---

## Fields

- categoryCode
- categoryName
- description
- isActive
- createdAt
- updatedAt

---

# Schemes Collection

# Collection: schemes

Purpose:

Stores all welfare schemes created and managed by administrators.

Examples:

- Amma Vodi
- NTR Bharosa Pension
- Rythu Bharosa
- Cheyutha
- Vidya Deevena
- Vasathi Deevena

---

## Schema Structure

schemeCode

Type:
String

Example:

AMMAVODI

Description:

Unique scheme identifier.

---

schemeName

Type:
String

Example:

Amma Vodi

Description:

Official scheme name.

---

description

Type:
String

Description:

Detailed scheme explanation.

---

department

Type:
String

Examples:

EDUCATION

AGRICULTURE

SOCIAL_WELFARE

HEALTH

WOMEN_AND_CHILD_WELFARE

Description:

Department responsible for scheme execution.

---

benefitType

Type:
String

Allowed Values:

DIRECT_BENEFIT_TRANSFER

PENSION

SCHOLARSHIP

SUBSIDY

REIMBURSEMENT

Description:

Type of financial benefit.

---

benefitAmount

Type:
Number

Example:

15000

Description:

Benefit amount provided to eligible citizens.

---

media

Type:
Object

Fields:

bannerImage

thumbnailImage

galleryImages

guidelinesDocument

governmentOrderDocument

Example:

{
bannerImage:
"/uploads/schemes/banner/amma-vodi.jpg",

thumbnailImage:
"/uploads/schemes/thumbnail/amma-vodi.jpg",

galleryImages: [
"/uploads/schemes/gallery/img1.jpg",
"/uploads/schemes/gallery/img2.jpg"
],

guidelinesDocument:
"/uploads/schemes/documents/guidelines.pdf",

governmentOrderDocument:
"/uploads/schemes/documents/go.pdf"
}

Description:

Stores all scheme related media and documents.

---

eligibility

Type:
Object

Fields:

minAge

maxAge

gender

maxAnnualIncome

casteCategories

studentRequired

farmerRequired

widowRequired

disabledRequired

Example:

{
minAge: 18,

maxAge: 60,

gender: ["FEMALE"],

maxAnnualIncome: 120000,

casteCategories: [
"SC",
"ST",
"BC"
],

studentRequired: false,

farmerRequired: false,

widowRequired: false,

disabledRequired: false
}

Description:

Stores all eligibility rules.

---

requiredDocuments

Type:
Array<String>

Example:

[
"AADHAAR",
"RATION_CARD",
"INCOME_CERTIFICATE"
]

Description:

Mandatory documents required during application.

---

applicationFields

Type:
Array<String>

Example:

[
"bankAccountNumber",
"ifscCode",
"collegeName"
]

Description:

Dynamic fields required by the scheme.

---

startDate

Type:
Date

Description:

Scheme application start date.

---

endDate

Type:
Date

Description:

Scheme application end date.

---

isActive

Type:
Boolean

Default:

true

Description:

Controls whether citizens can apply.

---

createdBy

Type:
ObjectId

Reference:

User

Description:

Administrator who created the scheme.

---

updatedBy

Type:
ObjectId

Reference:

User

Description:

Administrator who last modified the scheme.

---

createdAt

Type:
Date

Description:

Automatic creation timestamp.

---

updatedAt

Type:
Date

Description:

Automatic update timestamp.

---

Indexes

1. schemeCode (Unique)

2. department

3. isActive

---

Future Relationships

Scheme
↓
Applications

Scheme
↓
Required Documents

Scheme
↓
Eligibility Validation

Scheme
↓
Dashboard Analytics

---

# Applications Collection

## Purpose

Stores welfare scheme applications submitted by citizens.

---

## Fields

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
- applicationYear
- applicationMonth
- createdAt
- updatedAt

---

## Application Number Format

APP-2026-000001

APP-2026-000002

APP-2026-000003

---

## Status Values

- DRAFT
- SUBMITTED
- UNDER_VERIFICATION
- CORRECTION_REQUIRED
- VERIFIED
- APPROVED
- REJECTED

---

## Indexes

applicationNumber → Unique

applicantId

schemeId

assignedOfficerId

status

applicationYear

applicationMonth

---

# Application Form Data Collection

## Purpose

Stores dynamic form values for different schemes.

This allows new schemes to be added without database structure changes.

---

## Fields

- applicationId
- formData
- createdAt
- updatedAt

---

## Example

{
"childName": "Rahul",
"schoolName": "Government School",
"class": "8"
}

---

# Application Documents Collection

## Purpose

Stores uploaded document metadata.

Files are stored in:

backend/uploads/

Database stores only metadata.

---

## Fields

- applicationId
- documentType
- fileName
- filePath
- uploadedBy
- uploadedAt

---

## Supported Documents

- Aadhaar Card
- Ration Card
- Income Certificate
- Bank Passbook
- Passport Photo
- Disability Certificate

---

# Application Timeline Collection

## Purpose

Tracks complete application history.

Every status change must create a timeline record.

---

## Fields

- applicationId
- oldStatus
- newStatus
- remarks
- changedBy
- changedAt

---

## Example Workflow

SUBMITTED

↓

UNDER_VERIFICATION

↓

CORRECTION_REQUIRED

↓

SUBMITTED

↓

UNDER_VERIFICATION

↓

VERIFIED

↓

APPROVED

---

# Notifications Collection

## Purpose

Stores system notifications.

---

## Fields

- userId
- title
- message
- isRead
- createdAt

---

## Examples

Application Submitted

Application Approved

Application Rejected

Correction Requested

---

# Audit Logs Collection

## Purpose

Tracks important system actions.

Provides traceability and accountability.

---

## Fields

- userId
- module
- action
- description
- ipAddress
- createdAt

---

## Examples

LOGIN

LOGOUT

CREATE_ADMIN

CREATE_OFFICER

CREATE_SCHEME

UPDATE_SCHEME

SUBMIT_APPLICATION

APPROVE_APPLICATION

REJECT_APPLICATION

DEACTIVATE_USER

---

# Dashboard Analytics Strategy

Dashboard statistics are generated dynamically.

Statistics are never stored separately.

---

## Dashboard Metrics

Admin Dashboard

- Total Users
- Total Admins
- Total Officers
- Total Citizens
- Active Users
- Inactive Users
- Total Schemes
- Total Applications

---

Officer Dashboard

- Assigned Applications
- Pending Verification
- Approved Applications
- Rejected Applications

---

Citizen Dashboard

- Total Applications
- Approved Applications
- Rejected Applications
- Pending Applications

---

## Charts

Pie Charts

- Application Status Distribution

Bar Charts

- Scheme Wise Applications
- Monthly Application Trends

Data generated using MongoDB aggregation pipelines.

---

# Design Principles

1. Dynamic Scheme Support

2. Role-Based Access Control

3. Soft Delete Strategy

4. Complete Audit Trail

5. Dashboard Analytics Support

6. Scalable Collection Design

7. Production-Oriented Architecture
