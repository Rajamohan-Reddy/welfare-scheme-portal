# Coding Standards

## Purpose

This document defines coding standards and development guidelines for the Welfare Scheme Portal.

All team members must follow these standards.

---

# General Principles

1. Write Clean Code

2. Keep Code Readable

3. Avoid Duplicate Logic

4. Follow Consistent Naming

5. Use Meaningful Variable Names

---

# File Naming Convention

Use lowercase with dots.

Examples:

auth.routes.js

auth.controller.js

application.service.js

user.model.js

---

# Variable Naming

Use camelCase.

Correct:

applicationNumber

schemeName

userRole

Incorrect:

application_number

SchemeName

USER_ROLE

---

# Constants Naming

Use UPPER_CASE.

Examples:

ADMIN

OFFICER

CITIZEN

APPROVED

REJECTED

---

# Function Naming

Use descriptive names.

Correct:

createApplication()

approveApplication()

verifyApplication()

Incorrect:

save()

process()

run()

---

# Controller Rules

Controllers should:

- Receive Request
- Call Service
- Return Response

Controllers should NOT:

- Contain Database Queries
- Contain Complex Business Logic

---

# Service Rules

Services should:

- Handle Business Logic
- Process Workflow Rules
- Validate Business Conditions

Examples:

Approve Application

Assign Officer

Create Notification

---

# Model Rules

Models should only define:

- Schema
- Indexes
- Relationships

No business logic inside models.

---

# Error Handling

Use centralized error handling.

Do not repeat:

try-catch blocks everywhere unnecessarily.

Use standard error responses.

---

# API Response Standards

Success:

{
"success": true,
"message": "Success",
"data": {}
}

Error:

{
"success": false,
"message": "Error",
"errors": []
}

---

# Comments

Write comments only when necessary.

Avoid obvious comments.

Bad:

// increment count

count++

Good:

// Generate unique application number based on year and sequence

---

# Git Commit Standards

Use meaningful commit messages.

Examples:

feat: add authentication module

feat: add scheme management APIs

fix: resolve login validation issue

docs: update database design

refactor: improve application service

---

# Pull Request Standards

Before merging:

✓ Code Compiles

✓ Tests Pass

✓ No Console Errors

✓ Documentation Updated

✓ README Updated

---

# Project Rule

Whenever a new feature is added:

1. Update Documentation

2. Update README

3. Update API Contracts

4. Commit Changes

Documentation must always match the latest implementation.

This rule is mandatory for all team members.
