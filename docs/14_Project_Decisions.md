# Project Decisions

## Purpose

This document records important architectural and technical decisions made during project planning and development.

It serves as the single source of truth for future development.

---

# Repository Strategy

Repository Type:

Single Repository

Branches:

- main
- dev

Main Branch:

Production-ready code only.

Dev Branch:

All development work.

---

# Technology Decisions

Frontend:

React.js

Backend:

Node.js + Express.js

Database:

MongoDB

Authentication:

JWT

Password Hashing:

bcrypt

---

# Backend Architecture

Architecture Pattern:

Route

↓

Controller

↓

Service

↓

Model

↓

MongoDB

---

# Module System

JavaScript Modules:

ES Modules

package.json

"type": "module"

---

# Development Server

Command:

npm run dev

Runtime:

node --watch

Entry File:

src/index.js

---

# File Upload Strategy

Uploaded files stored in:

backend/uploads/

Database stores:

filePath

No cloud storage used.

Reason:

Capstone project scope.

---

# User Roles

ADMIN

OFFICER

CITIZEN

---

# User Creation Strategy

First Admin:

Created using seed process.

Additional Admins:

Created by existing Admins.

Officers:

Created by Admins.

Citizens:

Self Registration.

---

# User Deletion Strategy

Physical deletion is not allowed.

Users will be deactivated.

Field:

isActive

Reason:

Preserve application history and audit logs.

---

# Dashboard Strategy

Dashboard data is generated dynamically from database records.

No dashboard counts are stored separately.

Charts:

- Pie Charts
- Bar Charts

Statistics generated using MongoDB aggregation.

---

# API Versioning

Base URL:

/api/v1

Future versions:

/api/v2

---

# Documentation Rule

Whenever architecture changes:

1. Update Documentation

2. Update README

3. Commit Documentation Changes

4. Then Implement Code

Documentation must always reflect the latest implementation.
