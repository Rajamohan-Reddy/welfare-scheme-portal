# Project Decisions

## Authentication

Decision:

JWT + Refresh Token

Reason:

Scalable and frontend friendly.

---

## Authorization

Decision:

Role Based Access Control

Roles:

- ADMIN
- OFFICER
- CITIZEN

---

## Database

Decision:

MongoDB

Reason:

Flexible schema support for dynamic scheme forms.

---

## Architecture

Decision:

Controller-Service-Model Pattern

Reason:

Maintainability and scalability.

---

## Notifications

Decision:

Database Driven Notifications

Reason:

Future support for Email and SMS integration.

---

## Audit Trail

Decision:

Centralized Audit Logging

Reason:

Government applications require traceability.

---

## Upload Strategy

Decision:

Multer Local Storage

Reason:

Simple implementation.

Future:

AWS S3

Azure Blob Storage

---

## API Documentation

Decision:

Swagger OpenAPI 3.0

Reason:

Frontend and QA teams can test APIs independently.

---

## Application Workflow

Decision:

Multi-Level Verification

Flow:

Citizen

↓

Officer Verification

↓

Admin Approval

↓

Payment Release

Reason:

Matches government welfare distribution processes.
