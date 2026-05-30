# welfare-scheme-portal

MERN Stack Welfare Scheme and Service Management Portal with Authentication, Application Workflow, Verification and Dashboard Modules.

# BACKEND

# Welfare Scheme Management Portal - Backend

## Overview

The Welfare Scheme Management Portal is a government welfare administration platform designed to streamline the complete lifecycle of welfare scheme management.

The system enables:

- Citizens to apply for welfare schemes
- Officers to perform document and field verification
- Administrators to approve or reject applications
- Finance teams to release beneficiary payments
- System administrators to monitor operations through dashboards, reports, notifications, and audit logs

The backend is built using Node.js, Express.js, MongoDB, and JWT-based authentication with Role-Based Access Control (RBAC).

---

# Key Features

## Authentication & Authorization

- JWT Access Token Authentication
- Refresh Token Support
- Secure Password Hashing using bcrypt
- Role-Based Access Control (RBAC)
- Protected Routes
- Session Management

---

## User Management

Supported Roles:

### Admin

- Manage Schemes
- Manage Categories
- Approve Applications
- Reject Applications
- Release Payments
- View Reports
- View Dashboard Analytics

### Officer

- Verify Documents
- Perform Field Verification
- View Assigned Applications

### Citizen

- Register Account
- Login
- Apply for Schemes
- Upload Documents
- Track Application Status
- Receive Notifications

---

## Scheme Management

- Scheme Categories
- Welfare Schemes
- Scheme Media Management
- Eligibility Rules
- Required Documents
- Dynamic Application Fields
- Scheme Activation / Deactivation

Supported Media:

- Banner Image
- Thumbnail Image
- Gallery Images
- Guidelines Documents
- Government Order Documents

---

## Application Management

Citizens can:

- Browse Schemes
- Submit Applications
- Upload Required Documents
- Track Status

Application Workflow:

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

## Verification Workflow

### Document Verification

Performed by Officers

Checks:

- Uploaded Documents
- Eligibility Documents
- Identity Verification

---

### Field Verification

Performed by Officers

Checks:

- Address Verification
- Beneficiary Validation
- Ground-Level Verification

---

## Payment Management

After approval:

- Payment Processing
- Transaction Tracking
- Payment History
- Payment Status Monitoring

Supported Statuses:

- PENDING
- SUCCESS
- FAILED

---

## Notification System

Automatic Notifications:

### Application Submitted

Citizen receives confirmation.

### Document Verified

Citizen receives verification update.

### Field Verification Completed

Citizen receives verification update.

### Application Approved

Citizen receives approval notification.

### Application Rejected

Citizen receives rejection notification.

### Payment Released

Citizen receives payment confirmation.

---

## Audit Trail

The system records all important actions.

Tracked Events:

### Authentication

- Login
- Logout

### Scheme Operations

- Create Scheme
- Update Scheme
- Delete Scheme

### Application Operations

- Application Submission

### Verification Operations

- Document Verification
- Field Verification
- Approval
- Rejection

### Payment Operations

- Payment Release

---

# Technology Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## File Uploads

- Multer

## Documentation

- Swagger (OpenAPI 3.0)

## Security

- Helmet
- CORS
- Rate Limiting
- Request Logging

---

# Project Structure

backend/

├── src/

│ ├── config/

│ ├── constants/

│ ├── controllers/

│ ├── docs/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── services/

│ ├── uploads/

│ ├── utils/

│ ├── validators/

│ └── seeds/

│

├── docs/

├── package.json

├── .env

└── README.md

---

# Database Collections

users

schemecategories

schemes

applications

verificationhistories

payments

notifications

auditlogs

---

# API Modules

## Authentication

/api/v1/auth

### Endpoints

POST /register

POST /login

POST /logout

POST /refresh-token

GET /me

---

## Scheme Categories

/api/v1/scheme-categories

---

## Schemes

/api/v1/schemes

---

## Applications

/api/v1/applications

---

## Verification

/api/v1/verifications

---

## Payments

/api/v1/payments

---

## Notifications

/api/v1/notifications

---

## Dashboard

/api/v1/dashboard

---

## Reports

/api/v1/reports

---

## Uploads

/api/v1/uploads

---

# Security Features

- JWT Authentication
- Refresh Token Management
- Role-Based Access Control
- API Rate Limiting
- Security Headers
- Request Logging
- Input Validation
- Secure Password Storage

---

# Swagger Documentation

Swagger URL:

http://localhost:5000/api-docs

Provides:

- Endpoint Documentation
- Request Examples
- Response Examples
- Authentication Testing

---

# Environment Variables

PORT=5000

NODE_ENV=development

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=15m

REFRESH_TOKEN_EXPIRES_IN=7d

ADMIN_EMAIL=

ADMIN_PASSWORD=

CLIENT_URL=http://localhost:5173

---

# Running the Project

Install Dependencies

npm install

Start Development Server

npm run dev

Seed Default Admin

npm run seed-admin

---

# Current Backend Status

Authentication: Complete

Authorization: Complete

Scheme Management: Complete

Application Workflow: Complete

Verification Workflow: Complete

Payment Workflow: Complete

Notifications: Complete

Audit Logs: Complete

Uploads: Complete

Swagger Documentation: Complete

Security Hardening: Complete

---

# Future Enhancements

- Citizen Payment History
- Email Notifications
- SMS Notifications
- Advanced Search
- Pagination
- Scheme Recommendation Engine
- Eligibility Auto-Matching
- Analytics Enhancements

---

# License

Internal Project - Welfare Scheme Management Portal
