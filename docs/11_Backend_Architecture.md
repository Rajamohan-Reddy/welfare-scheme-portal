# Backend Architecture

## Overview

The Welfare Scheme / Service Management Portal backend follows a layered architecture to ensure maintainability, scalability, and separation of concerns.

The application is built using:

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Architecture Flow

Client Request

↓

Route

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

# Layer Responsibilities

## Routes Layer

Purpose:

Defines API endpoints.

Responsibilities:

- API URL Mapping
- Route Registration
- Middleware Binding

Examples:

- auth.routes.js
- scheme.routes.js
- application.routes.js

Routes should not contain business logic.

---

## Controller Layer

Purpose:

Handle requests and responses.

Responsibilities:

- Receive Request
- Validate Request Data
- Call Service Layer
- Return Response

Controllers should remain thin.

Business logic must not be implemented here.

---

## Service Layer

Purpose:

Contains business logic.

Responsibilities:

- Process Business Rules
- Handle Workflow Logic
- Validate Business Conditions
- Interact With Database Models

Examples:

- Create Application
- Approve Application
- Verify Application
- Create Scheme

Most application logic will reside here.

---

## Model Layer

Purpose:

Database interaction.

Responsibilities:

- MongoDB Collections
- Schema Definitions
- Relationships
- Indexes

Examples:

- User Model
- Scheme Model
- Application Model

---

## Middleware Layer

Purpose:

Request interception and processing.

Responsibilities:

- Authentication
- Authorization
- Error Handling
- Request Logging

Examples:

- auth.middleware.js
- role.middleware.js
- error.middleware.js

---

## Validator Layer

Purpose:

Input validation.

Responsibilities:

- Required Field Validation
- Email Validation
- Password Validation
- Request Payload Validation

Examples:

- auth.validator.js
- application.validator.js

---

# Folder Structure

backend/

src/

config/

constants/

controllers/

middleware/

models/

routes/

services/

validators/

utils/

uploads/

app.js

server.js

---

# Authentication Flow

User Login

↓

JWT Generated

↓

Token Returned

↓

Protected Route Access

↓

Token Verification

↓

Role Validation

↓

API Execution

---

# Application Workflow

Citizen

↓

Submit Application

↓

Officer Verification

↓

Approved / Rejected

↓

Notification Generated

↓

Timeline Updated

---

# Design Principles

1. Separation of Concerns

2. Reusable Components

3. Centralized Error Handling

4. Standardized API Responses

5. Role-Based Authorization

6. Scalable Folder Structure

7. Maintainable Codebase

---

# Future Enhancements

Possible Future Improvements:

- Redis Caching
- Cloud Storage
- Microservices
- Email Notifications
- SMS Notifications

These enhancements are outside the scope of the current capstone project.
