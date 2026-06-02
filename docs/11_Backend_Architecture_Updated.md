# Backend Architecture (Updated)

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React/Vite)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ├─ HTTP Requests
                       └─ JWT Authorization
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  Express.js Server                       │
│  ┌─────────────────────────────────────────────────────┐│
│  │        Routes (API Endpoints)                       ││
│  └────────────┬────────────────────────────────────────┘│
│               │                                          │
│  ┌────────────▼────────────────────────────────────────┐│
│  │    Middleware Layer                                 ││
│  │  • Authentication (JWT)                             ││
│  │  • Authorization (RBAC)                             ││
│  │  • Validation                                       ││
│  │  • Logging                                          ││
│  │  • Error Handling                                   ││
│  └────────────┬────────────────────────────────────────┘│
│               │                                          │
│  ┌────────────▼────────────────────────────────────────┐│
│  │    Controllers                                      ││
│  │  • Request parsing                                  ││
│  │  • Response formatting                              ││
│  │  • Error handling                                   ││
│  └────────────┬────────────────────────────────────────┘│
│               │                                          │
│  ┌────────────▼────────────────────────────────────────┐│
│  │    Services (Business Logic)                        ││
│  │  • Workflows                                        ││
│  │  • Calculations                                     ││
│  │  • Notifications                                    ││
│  │  • Audit Logs                                       ││
│  │  • Data Aggregation                                 ││
│  └────────────┬────────────────────────────────────────┘│
│               │                                          │
│  ┌────────────▼────────────────────────────────────────┐│
│  │    Models (Schemas & Validation)                    ││
│  │  • User, Scheme, Application                        ││
│  │  • Payment, Notification, AuditLog                  ││
│  │  • Indexes & Relationships                          ││
│  └────────────┬────────────────────────────────────────┘│
│               │                                          │
└───────────────┼──────────────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────┐
│              MongoDB Database                            │
│  • Collections: users, schemes, applications, payments   │
│  • Indexes for performance optimization                  │
│  • Replication & Backup                                  │
└───────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
backend/
├── src/
│   ├── app.js                          # Express app setup
│   ├── index.js                        # Server entry point
│   │
│   ├── config/
│   │   ├── db.config.js               # MongoDB connection
│   │   ├── env.config.js              # Environment setup
│   │   ├── security.config.js         # Security headers
│   │   └── swagger.config.js          # API docs
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT validation
│   │   ├── error.middleware.js        # Error handling
│   │   └── validation.middleware.js   # Input validation
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user-management.controller.js
│   │   ├── scheme.controller.js
│   │   ├── scheme-category.controller.js
│   │   ├── application.controller.js
│   │   ├── verification.controller.js
│   │   ├── payment.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── notification.controller.js
│   │   ├── upload.controller.js
│   │   └── audit-log.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user-management.service.js
│   │   ├── scheme.service.js
│   │   ├── application.service.js
│   │   ├── verification.service.js
│   │   ├── payment.service.js
│   │   ├── dashboard.service.js
│   │   ├── dashboard-analytics.service.js
│   │   ├── notification.service.js
│   │   ├── upload.service.js
│   │   └── audit.service.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── scheme.model.js
│   │   ├── scheme-category.model.js
│   │   ├── application.model.js
│   │   ├── payment.model.js
│   │   ├── notification.model.js
│   │   ├── audit-log.model.js
│   │   └── index.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user-management.routes.js
│   │   ├── scheme.routes.js
│   │   ├── scheme-category.routes.js
│   │   ├── application.routes.js
│   │   ├── admin-application.routes.js
│   │   ├── verification.routes.js
│   │   ├── payment.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── dashboard-analytics.routes.js
│   │   ├── notification.routes.js
│   │   ├── upload.routes.js
│   │   ├── audit-log.routes.js
│   │   └── admin.routes.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   ├── scheme.validator.js
│   │   ├── application.validator.js
│   │   └── payment.validator.js
│   │
│   ├── constants/
│   │   ├── application-status.constants.js
│   │   ├── api-messages.constants.js
│   │   ├── audit.constants.js
│   │   ├── roles.constants.js
│   │   └── other.constants.js
│   │
│   ├── utils/
│   │   ├── api-response.js            # Response formatter
│   │   ├── jwt-helper.js              # JWT operations
│   │   └── file-handler.js            # File operations
│   │
│   ├── docs/
│   │   ├── auth.docs.js
│   │   ├── user.docs.js
│   │   ├── scheme.docs.js
│   │   └── other.docs.js
│   │
│   └── seeds/
│       ├── admin-seed.js
│       └── scheme-seed.js
│
└── package.json
```

---

## Core Layers Explanation

### 1. Controllers (`src/controllers/`)

**Purpose**: Handle HTTP request/response cycle

**Responsibilities**:
- Parse incoming request data
- Call appropriate service methods
- Format and send responses
- Handle validation errors

**Example**:
```javascript
export const createApplication = async (req, res) => {
  try {
    // Input validation
    const { schemeId, fieldValues } = req.body;
    
    // Call service
    const application = await createApplicationService({
      citizenId: req.user.userId,
      schemeId,
      fieldValues,
      documents: req.files
    });
    
    // Send response
    return successResponse({
      res,
      message: "Application created",
      data: application
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message
    });
  }
};
```

---

### 2. Services (`src/services/`)

**Purpose**: Implement business logic

**Responsibilities**:
- Complex calculations
- Workflow management
- Data transformations
- Generate notifications
- Create audit logs
- Coordinate between models

**Example**:
```javascript
export const approveApplication = async ({
  applicationId,
  remarks,
  approvedBy
}) => {
  // Fetch application
  const application = await Application.findById(applicationId);
  
  // Update status
  application.status = "APPROVED";
  application.approvalDetails = {
    approvedBy,
    remarks,
    approvedAt: new Date()
  };
  
  await application.save();
  
  // Create notification
  await createNotification({
    userId: application.citizenId,
    title: "Application Approved",
    message: "Your application has been approved",
    relatedTo: { type: "APPLICATION", id: applicationId }
  });
  
  // Create audit log
  await createAuditLog({
    action: "APPROVE",
    entity: "APPLICATION",
    entityId: applicationId,
    performedBy: approvedBy
  });
  
  return application;
};
```

---

### 3. Models (`src/models/`)

**Purpose**: Define data structure and validation

**Responsibilities**:
- Schema definition
- Validation rules
- Indexes for queries
- Relationships

**Example**:
```javascript
const applicationSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: String,
      unique: true,
      required: true
    },
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: APPLICATION_STATUS_VALUES,
      default: "SUBMITTED"
    },
    documents: [{
      fileName: String,
      fileUrl: String,
      uploadedAt: Date
    }]
  },
  { timestamps: true }
);

// Performance indexes
applicationSchema.index({ citizenId: 1, status: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });
```

---

### 4. Routes (`src/routes/`)

**Purpose**: Define API endpoints

**Responsibilities**:
- Map HTTP methods to controller actions
- Apply middleware (auth, validation)
- Set authorization rules

**Example**:
```javascript
const router = express.Router();

// Protected route - only authenticated users
router.post(
  "/",
  authenticate,
  validate(createApplicationSchema),
  createApplication
);

// Protected route - only admin
router.get(
  "/statistics",
  authenticate,
  authorize(ROLES.ADMIN),
  getApplicationStatistics
);

// Public route
router.get("/:id/public", getPublicApplicationInfo);

export default router;
```

---

## Request Flow Example

### Apply for Scheme

```
1. Frontend (POST /api/v1/applications)
   └─ Sends: { schemeId, documents[], fieldValues }
   └─ Headers: { Authorization: "Bearer token" }

2. Express Route Handler
   └─ Matches: POST /applications

3. Middleware Chain
   ├─ authenticate: Validates JWT token
   ├─ authorize: Checks CITIZEN role
   └─ validate: Validates input schema

4. Controller (application.controller.js)
   └─ Calls: createApplication(req, res)
   ├─ Extracts: citizenId, schemeId, documents
   └─ Calls: applicationService.createApplication()

5. Service (application.service.js)
   ├─ Validates eligibility
   ├─ Uploads documents
   ├─ Creates Application document in DB
   ├─ Generates AuditLog
   ├─ Creates Notification
   └─ Returns: Created application

6. Controller Response
   └─ Formats and sends: { success: true, data: application }

7. Frontend
   └─ Receives and displays result
```

---

## Security Implementation

### Authentication (JWT)
```javascript
// Token generation
const token = jwt.sign(
  { userId, role },
  JWT_SECRET,
  { expiresIn: "15m" }
);

// Token validation
const decoded = jwt.verify(token, JWT_SECRET);
```

### Authorization (RBAC)
```javascript
// Check role
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return errorResponse({ res, message: "Forbidden" });
  }
  next();
};

// Usage
router.post(
  "/approve",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  controller
);
```

### Input Validation
```javascript
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("CITIZEN", "OFFICER", "ADMIN")
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return errorResponse({ res, message: error.message });
  next();
};
```

---

## Database Relationships

```
User (1) ──────── (M) Application
  │
  └──────── (M) Notification
  │
  └──────── (M) AuditLog

Scheme (1) ──────── (M) Application
  │
  └──────── (1) SchemeCategory

Application (1) ──────── (M) Payment
  │
  └──────── (M) Verification

SchemeCategory (1) ──────── (M) Scheme
```

---

## Performance Considerations

### Database Indexes
- Applied on frequently queried fields
- Composite indexes for common filter combinations
- Indexed: userId, status, createdAt, etc.

### Caching Strategy
- Dashboard stats cached for 5 minutes
- Scheme listings cached for 1 hour
- User profile cached for session duration

### Pagination
- Applied to all list endpoints
- Default: 10 items per page
- Max: 100 items per page

---

## Error Handling Strategy

### Structured Errors
```javascript
// All errors follow pattern
{
  success: false,
  message: "User-friendly message",
  error: "Detailed error for debugging"
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

---

## Monitoring & Logging

### Audit Logging
- Every state change logged
- Tracks: User, Action, Entity, Timestamp
- Used for compliance and debugging

### Application Logs
- Request/Response logging
- Error tracking and reporting
- Performance metrics

---

## Deployment Considerations

### Environment Variables
```
NODE_ENV=production
MONGODB_URI=production_db_url
JWT_SECRET=strong_secret
PORT=production_port
```

### Scaling Strategy
- Horizontal scaling with load balancer
- MongoDB connection pooling
- Redis for caching (optional)

---

## Documentation

- **Swagger/OpenAPI**: Auto-generated from code comments
- **API Reference**: `/docs` endpoint
- **Postman Collection**: Available in `/postman/` directory

---

## Key Technologies

- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Joi**: Validation
- **Multer**: File uploads
- **Helmet**: Security headers
- **CORS**: Cross-origin requests
- **Express-rate-limit**: Rate limiting
