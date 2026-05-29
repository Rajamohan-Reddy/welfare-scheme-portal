# API Naming Standards

## Purpose

This document defines API naming conventions used throughout the project.

Following these standards ensures consistency and readability.

---

# Base URL

/api/v1

Example:

/api/v1/auth/login

---

# General Rules

Use:

- Lowercase URLs
- Hyphen-separated words
- Plural resource names

Examples:

Correct:

/api/v1/schemes

/api/v1/applications

Incorrect:

/api/v1/Schemes

/api/v1/ApplicationList

---

# HTTP Methods

## GET

Retrieve Data

Examples:

GET /api/v1/schemes

GET /api/v1/applications

---

## POST

Create Data

Examples:

POST /api/v1/auth/register

POST /api/v1/applications

---

## PUT

Update Entire Resource

Examples:

PUT /api/v1/schemes/:id

PUT /api/v1/applications/:id

---

## PATCH

Partial Update

Examples:

PATCH /api/v1/applications/:id/approve

PATCH /api/v1/applications/:id/reject

---

## DELETE

Delete Resource

Examples:

DELETE /api/v1/schemes/:id

---

# Endpoint Structure

Resource Collection

/api/v1/schemes

Single Resource

/api/v1/schemes/:id

Nested Action

/api/v1/applications/:id/approve

---

# Authentication Routes

POST /api/v1/auth/register

POST /api/v1/auth/login

POST /api/v1/auth/logout

GET /api/v1/auth/profile

---

# Scheme Routes

GET /api/v1/schemes

GET /api/v1/schemes/:id

POST /api/v1/schemes

PUT /api/v1/schemes/:id

DELETE /api/v1/schemes/:id

---

# Application Routes

POST /api/v1/applications

GET /api/v1/applications

GET /api/v1/applications/:id

PUT /api/v1/applications/:id

DELETE /api/v1/applications/:id

---

# Dashboard Routes

GET /api/v1/dashboard/admin

GET /api/v1/dashboard/officer

GET /api/v1/dashboard/citizen

---

# Response Standard

Success

{
"success": true,
"message": "Operation successful",
"data": {}
}

Error

{
"success": false,
"message": "Operation failed",
"errors": []
}

---

# Naming Standards

Files:

auth.routes.js

auth.controller.js

auth.service.js

user.model.js

Use camelCase for variables and functions.

Use PascalCase for classes if introduced later.

Maintain consistency across the codebase.
