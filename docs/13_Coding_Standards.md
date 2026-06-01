# Coding Standards

## General Rules

- Use ES Modules
- Use async/await
- Avoid nested callbacks
- Follow Controller-Service-Model pattern
- Keep business logic inside services

---

## Naming Standards

### Files

auth.controller.js

auth.service.js

auth.routes.js

auth.validator.js

auth.middleware.js

---

### Constants

UPPER_SNAKE_CASE

Example:

APPLICATION_STATUS

ROLES

HTTP_STATUS

---

### Functions

camelCase

Examples:

createApplication

approveApplication

releasePayment

createNotification

createAuditLog

---

## API Responses

Always use:

successResponse()

errorResponse()

Never return raw responses directly.

---

## Authentication

All protected APIs must use:

authenticate

Role-based APIs must additionally use:

authorize

---

## Audit Logging

All critical business actions should generate audit logs.

Examples:

- Login
- Logout
- Scheme Create
- Scheme Update
- Scheme Delete
- Application Submit
- Verification Actions
- Payment Release

---

## Notifications

All citizen-facing workflow events should generate notifications.

Examples:

- Application Submitted
- Verification Completed
- Approval
- Rejection
- Payment Released

---

## Database Standards

- Use indexes where required
- Use references for relationships
- Avoid embedding large datasets
- Use timestamps on all collections

---

## Documentation Standards

Every route must have:

- Swagger Documentation
- Request Example
- Response Example
- Authorization Information
