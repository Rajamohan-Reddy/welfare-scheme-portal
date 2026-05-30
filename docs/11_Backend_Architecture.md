# Backend Architecture

## Architecture Pattern

Controller

↓

Service

↓

Model

↓

MongoDB

---

## Layers

### Controllers

Handle:

- Request Processing
- Response Formatting
- Validation Handling

### Services

Handle:

- Business Logic
- Workflow Management
- Audit Generation
- Notification Generation

### Models

Handle:

- Database Schemas
- Relationships
- Indexes

### Middleware

Handle:

- Authentication
- Authorization
- Rate Limiting
- Request Logging
- Error Handling

---

## Security

- JWT Authentication
- Refresh Token Strategy
- RBAC
- Helmet
- Rate Limiting
- Input Validation

---

## Supporting Modules

- Notifications
- Audit Logs
- Upload Management
- Dashboard APIs
- Reports APIs
- Swagger Documentation
