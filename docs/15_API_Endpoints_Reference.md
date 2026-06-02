# Backend API Documentation

## Overview

The Welfare Scheme Portal backend is a comprehensive Express.js + MongoDB application designed to manage welfare applications, schemes, payments, and user interactions with role-based access control.

---

## Architecture

### Design Pattern

```
Request
  ↓
Middleware (Auth, Validation, Logging)
  ↓
Routes
  ↓
Controllers (Request handling)
  ↓
Services (Business Logic)
  ↓
Models (Database)
  ↓
MongoDB
  ↓
Response (JSON)
```

### Key Layers

#### 1. **Controllers** (`src/controllers/`)
- Request processing and validation
- Response formatting
- Error handling
- Data transformation

#### 2. **Services** (`src/services/`)
- Core business logic
- Workflow orchestration
- Notification generation
- Audit log creation
- Data aggregation

#### 3. **Models** (`src/models/`)
- Mongoose schemas
- Data validation
- Indexes for performance
- Relationships and references

#### 4. **Middleware** (`src/middleware/`)
- JWT authentication
- Role-based authorization
- Request logging
- Error handling

#### 5. **Routes** (`src/routes/`)
- Endpoint definitions
- Route protection
- Method mappings

---

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "CITIZEN" | "OFFICER" | "ADMIN"
}

Response: { accessToken, refreshToken, user }
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { accessToken, refreshToken, user }
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "token_here"
}

Response: { accessToken, refreshToken }
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {accessToken}

Response: { message: "Logged out successfully" }
```

---

### User Management Routes (`/api/v1/users`)

#### Get All Users (Admin only)
```http
GET /users
Authorization: Bearer {accessToken}

Response: { data: [users...] }
```

#### Get User Statistics (Admin only)
```http
GET /users/statistics
Authorization: Bearer {accessToken}

Response: {
  data: {
    totalUsers,
    usersByRole: { CITIZEN: count, OFFICER: count, ADMIN: count },
    recentUsers: [...]
  }
}
```

#### Get My Profile
```http
GET /users/me
Authorization: Bearer {accessToken}

Response: { data: user }
```

#### Update Profile
```http
PATCH /users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "gender": "MALE" | "FEMALE" | "OTHER",
  "dob": "1990-01-01",
  "aadhar": "123456789012",
  "address": "123 Main St",
  "profilePicture": "url"
}

Response: { data: updatedUser }
```

---

### Schemes Routes (`/api/v1/schemes`)

#### Get All Schemes (Public)
```http
GET /schemes

Response: { data: [schemes...] }
```

#### Get Scheme Details (Public)
```http
GET /schemes/{schemeId}

Response: { data: scheme }
```

#### Create Scheme (Admin only)
```http
POST /schemes
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "schemeCode": "SC001",
  "schemeName": "Scholarship Scheme",
  "description": "...",
  "department": "EDUCATION",
  "categoryId": "catId",
  "benefitType": "SCHOLARSHIP",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "maxBenefit": 50000,
  "eligibilityRules": {...},
  "media": {
    "bannerImage": "url",
    "thumbnailImage": "url"
  }
}

Response: { data: newScheme }
```

#### Update Scheme (Admin only)
```http
PATCH /schemes/{schemeId}
Authorization: Bearer {accessToken}

Response: { data: updatedScheme }
```

#### Delete Scheme (Admin only)
```http
DELETE /schemes/{schemeId}
Authorization: Bearer {accessToken}

Response: { message: "Scheme deleted" }
```

---

### Scheme Categories Routes (`/api/v1/scheme-categories`)

#### Get All Categories
```http
GET /scheme-categories

Response: { data: [categories...] }
```

#### Create Category (Admin only)
```http
POST /scheme-categories
Authorization: Bearer {accessToken}

{
  "categoryCode": "CAT001",
  "categoryName": "Education",
  "description": "..."
}

Response: { data: newCategory }
```

#### Update Category (Admin only)
```http
PATCH /scheme-categories/{categoryId}
Authorization: Bearer {accessToken}

Response: { data: updatedCategory }
```

#### Delete Category (Admin only)
```http
DELETE /scheme-categories/{categoryId}
Authorization: Bearer {accessToken}

Response: { message: "Category deleted" }
```

---

### Applications Routes (`/api/v1/applications`)

#### Create Application (Citizen)
```http
POST /applications
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

{
  "schemeId": "scheme_id",
  "documents": [files...],
  "fieldValues": {
    "field1": "value1",
    "field2": "value2"
  }
}

Response: { data: newApplication }
```

#### Get My Applications (Citizen)
```http
GET /applications
Authorization: Bearer {accessToken}

Response: { data: [applications...] }
```

#### Get Application Details
```http
GET /applications/{applicationId}
Authorization: Bearer {accessToken}

Response: { data: application }
```

#### Get All Applications (Admin/Officer)
```http
GET /admin/applications
Authorization: Bearer {accessToken}

Response: { data: [applications...] }
```

#### Get Application Statistics (Admin)
```http
GET /admin/applications/statistics
Authorization: Bearer {accessToken}

Response: {
  data: {
    totalApplications,
    submitted,
    documentVerified,
    fieldVerified,
    approved,
    rejected,
    paid,
    recentApplications
  }
}
```

---

### Verifications Routes (`/api/v1/verifications`)

#### Get Pending Verifications (Officer/Admin)
```http
GET /verifications/pending
Authorization: Bearer {accessToken}

Response: { data: [applications...] }
```

#### Document Verify Application (Officer)
```http
PATCH /verifications/{applicationId}/document-verify
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "remarks": "Documents verified"
}

Response: { data: updatedApplication }
```

#### Field Verify Application (Officer)
```http
PATCH /verifications/{applicationId}/field-verify
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "remarks": "Field verification completed"
}

Response: { data: updatedApplication }
```

#### Approve Application (Officer/Admin)
```http
PATCH /verifications/{applicationId}/approve
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "remarks": "Approved"
}

Response: { data: approvedApplication }
```

#### Reject Application (Officer/Admin)
```http
PATCH /verifications/{applicationId}/reject
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "remarks": "Rejected due to..."
}

Response: { data: rejectedApplication }
```

#### Get Field Verified Queue (Admin)
```http
GET /verifications/field-verified
Authorization: Bearer {accessToken}

Response: { data: [fieldVerifiedApplications...] }
```

---

### Payments Routes (`/api/v1/payments`)

#### Get All Payments (Admin)
```http
GET /payments
Authorization: Bearer {accessToken}

Response: { data: [payments...] }
```

#### Get Payment by ID (Admin)
```http
GET /payments/{paymentId}
Authorization: Bearer {accessToken}

Response: { data: payment }
```

#### Release/Process Payment (Admin)
```http
POST /payments/release/{applicationId}
Authorization: Bearer {accessToken}

Response: {
  data: payment,
  message: "Payment processed successfully"
}
```

#### Get Payment Analytics (Admin)
```http
GET /payments/analytics
Authorization: Bearer {accessToken}

Response: {
  data: {
    totalPayments: number,
    successfulPayments: number,
    totalDisbursed: amount
  }
}
```

---

### Dashboard Routes (`/api/v1/dashboard`)

#### Get Admin Dashboard Stats
```http
GET /dashboard/admin
Authorization: Bearer {accessToken}

Response: {
  data: {
    totalUsers,
    totalSchemes,
    totalApplications,
    approvedApplications,
    rejectedApplications,
    pendingApplications,
    totalPayments
  }
}
```

#### Get Officer Dashboard Stats
```http
GET /dashboard/officer
Authorization: Bearer {accessToken}

Response: {
  data: {
    pendingVerification,
    documentVerified,
    fieldVerified
  }
}
```

#### Get Citizen Dashboard Stats
```http
GET /dashboard/citizen
Authorization: Bearer {accessToken}

Response: {
  data: {
    totalApplications,
    approvedApplications,
    rejectedApplications
  }
}
```

#### Get Application Status Chart Data
```http
GET /dashboard/application-status-chart
Authorization: Bearer {accessToken}

Response: {
  data: [
    { name: "Submitted", value: count },
    { name: "Document Verified", value: count },
    { name: "Field Verified", value: count },
    { name: "Approved", value: count },
    { name: "Rejected", value: count },
    { name: "Paid", value: count }
  ]
}
```

#### Get Monthly Applications Chart Data
```http
GET /dashboard/monthly-applications-chart
Authorization: Bearer {accessToken}

Response: {
  data: [
    { month: "Jan", applications: count },
    { month: "Feb", applications: count },
    ...
  ]
}
```

#### Get Scheme-wise Applications
```http
GET /dashboard/scheme-wise-applications
Authorization: Bearer {accessToken}

Response: {
  data: [
    { scheme: "Scheme Name", applications: count },
    ...
  ]
}
```

#### Get Comprehensive Analytics (Admin/Officer)
```http
GET /dashboard/analytics
Authorization: Bearer {accessToken}

Response: {
  data: {
    summary: {
      totalApplications,
      totalUsers,
      totalSchemes,
      totalPayments,
      approvedApplications,
      rejectedApplications,
      paidApplications
    },
    applicationsByStatus: [...],
    applicationsByMonth: [...],
    usersByRole: [...],
    paymentsByMonth: [...],
    schemesByCategory: [...]
  }
}
```

---

### Notifications Routes (`/api/v1/notifications`)

#### Get My Notifications
```http
GET /notifications/my-notifications
Authorization: Bearer {accessToken}

Response: { data: [notifications...] }
```

#### Get Unread Count
```http
GET /notifications/unread-count
Authorization: Bearer {accessToken}

Response: { data: count }
```

#### Mark Notification as Read
```http
PATCH /notifications/{notificationId}/read
Authorization: Bearer {accessToken}

Response: { data: notification }
```

#### Mark All Notifications as Read
```http
PATCH /notifications/mark-all-read
Authorization: Bearer {accessToken}

Response: { message: "All notifications marked as read" }
```

#### Delete Notification
```http
DELETE /notifications/{notificationId}
Authorization: Bearer {accessToken}

Response: { message: "Notification deleted" }
```

#### Delete All Notifications
```http
DELETE /notifications
Authorization: Bearer {accessToken}

Response: { message: "All notifications deleted" }
```

---

### Upload Routes (`/api/v1/uploads`)

#### Upload Single File
```http
POST /uploads/single
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

multipart: file

Response: {
  data: {
    fileUrl: "url",
    fileName: "name"
  }
}
```

#### Upload Multiple Files
```http
POST /uploads/multiple
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

multipart: files[]

Response: {
  data: [
    { fileUrl, fileName },
    ...
  ]
}
```

---

### Audit Routes (`/api/v1/audit-logs`)

#### Get Audit Logs (Admin)
```http
GET /audit-logs
Authorization: Bearer {accessToken}

Response: { data: [auditLogs...] }
```

#### Get Application Audit Logs
```http
GET /audit-logs/application/{applicationId}
Authorization: Bearer {accessToken}

Response: { data: [auditLogs...] }
```

---

## Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: "CITIZEN" | "OFFICER" | "ADMIN",
  profile: {
    name: String,
    phone: String,
    gender: "MALE" | "FEMALE" | "OTHER",
    dob: Date,
    aadhar: String (unique),
    address: String,
    profilePicture: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Scheme Model
```javascript
{
  _id: ObjectId,
  schemeCode: String (unique),
  schemeName: String,
  description: String,
  department: String,
  categoryId: ObjectId (ref: SchemeCategory),
  benefitType: String,
  startDate: Date,
  endDate: Date,
  maxBenefit: Number,
  eligibilityRules: Object,
  media: {
    bannerImage: String,
    thumbnailImage: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Application Model
```javascript
{
  _id: ObjectId,
  applicationNo: String (unique),
  citizenId: ObjectId (ref: User),
  schemeId: ObjectId (ref: Scheme),
  status: "SUBMITTED" | "DOCUMENT_VERIFIED" | "FIELD_VERIFIED" | "APPROVED" | "REJECTED" | "PAID",
  documents: [{
    fileName: String,
    fileUrl: String,
    uploadedAt: Date
  }],
  fieldValues: Object,
  verifications: {
    documentVerification: {
      status: String,
      remarks: String,
      verifiedBy: ObjectId,
      verifiedAt: Date
    },
    fieldVerification: {
      status: String,
      remarks: String,
      verifiedBy: ObjectId,
      verifiedAt: Date
    }
  },
  approvalDetails: {
    approvedBy: ObjectId,
    remarks: String,
    approvedAt: Date
  },
  rejectionDetails: {
    rejectedBy: ObjectId,
    remarks: String,
    rejectedAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Model
```javascript
{
  _id: ObjectId,
  paymentNo: String (unique),
  applicationId: ObjectId (ref: Application),
  amount: Number,
  paymentStatus: "SUCCESS" | "FAILED" | "PENDING",
  paymentDate: Date,
  processedBy: ObjectId (ref: User),
  transactionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  message: String,
  type: String,
  read: Boolean,
  relatedTo: {
    type: String,
    id: ObjectId
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication & Authorization

### Authentication Flow
1. User registers/logs in
2. Backend generates JWT access token (15 min) and refresh token (7 days)
3. Frontend stores tokens in secure storage
4. All requests include `Authorization: Bearer {accessToken}` header
5. On token expiry, use refresh token to get new access token

### Authorization Levels
- **CITIZEN**: Can manage own applications, view own profile
- **OFFICER**: Can verify documents, perform field verification, approve/reject
- **ADMIN**: Full system access, manage schemes, users, payments

### Role-Based Route Protection
```javascript
router.get(
  "/route",
  authenticate,                    // Checks JWT
  authorize(ROLES.ADMIN),          // Checks role
  controller
);
```

---

## Environment Configuration

```
# .env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/welfare-scheme
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

---

## Error Handling

All endpoints return structured responses:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

---

## Rate Limiting

- Applied to auth routes: 5 requests per 15 minutes
- General routes: 100 requests per 15 minutes

---

## Support & Troubleshooting

For issues, check:
1. MongoDB connection
2. JWT configuration
3. Environment variables
4. File upload permissions
5. CORS settings
