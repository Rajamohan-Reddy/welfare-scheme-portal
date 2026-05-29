# Backend Folder Structure

## Overview

The backend follows a layered architecture with clear separation of responsibilities.

---

# Root Structure

backend/

package.json

.env

.env.example

src/

---

# src/index.js

Purpose:

Application entry point.

Responsibilities:

- Start server
- Connect MongoDB
- Handle startup errors

---

# src/app.js

Purpose:

Express application configuration.

Responsibilities:

- Register middleware
- Register routes
- Register error handlers

---

# config/

Purpose:

Application configuration.

Files:

db.config.js

env.config.js

Responsibilities:

- MongoDB connection
- Environment variable management

---

# constants/

Purpose:

Application-wide constants.

Files:

roles.constants.js

application-status.constants.js

api-messages.constants.js

Responsibilities:

- Store reusable constants
- Prevent hardcoded values

---

# controllers/

Purpose:

Handle requests and responses.

Files:

auth.controller.js

scheme.controller.js

application.controller.js

dashboard.controller.js

Responsibilities:

- Receive request
- Call service
- Return response

No business logic allowed.

---

# services/

Purpose:

Business logic layer.

Files:

auth.service.js

scheme.service.js

application.service.js

dashboard.service.js

Responsibilities:

- Process business rules
- Validate workflow rules
- Interact with models

---

# models/

Purpose:

MongoDB schemas.

Files:

user.model.js

scheme.model.js

application.model.js

notification.model.js

Responsibilities:

- Collection structure
- Indexes
- Relationships

---

# routes/

Purpose:

API endpoint definitions.

Files:

auth.routes.js

scheme.routes.js

application.routes.js

dashboard.routes.js

Responsibilities:

- Define API URLs
- Apply middleware
- Connect controllers

---

# middleware/

Purpose:

Request processing.

Files:

auth.middleware.js

role.middleware.js

error.middleware.js

not-found.middleware.js

Responsibilities:

- Authentication
- Authorization
- Error handling

---

# validators/

Purpose:

Request validation.

Files:

auth.validator.js

scheme.validator.js

application.validator.js

Responsibilities:

- Required field validation
- Format validation
- Request validation

---

# utils/

Purpose:

Reusable helper functions.

Files:

generate-application-number.js

api-response.js

jwt-helper.js

file-helper.js

Responsibilities:

- Shared utilities
- Common helper functions

---

# uploads/

Purpose:

Store uploaded documents.

Folders:

aadhaar/

photos/

income-certificates/

bank-passbooks/

Responsibilities:

- Store uploaded files
- Organize documents

---

# shared/

Purpose:

Shared application resources.

Files:

enums.js

messages.js

permissions.js

Responsibilities:

- Shared reusable definitions

---

# Architecture Flow

Client

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Model

↓

MongoDB

↓

Response

---

# Design Principles

1. Separation of Concerns

2. Reusable Components

3. Centralized Error Handling

4. Role-Based Authorization

5. Scalable Architecture

6. Production-Grade Structure
