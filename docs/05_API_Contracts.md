# API Contracts

## Base URL

/api/v1

---

## Authentication

POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/refresh-token

GET /auth/me

---

## Scheme Categories

GET /scheme-categories

GET /scheme-categories/:id

POST /scheme-categories

PUT /scheme-categories/:id

DELETE /scheme-categories/:id

---

## Schemes

GET /schemes

GET /schemes/:id

POST /schemes

PUT /schemes/:id

DELETE /schemes/:id

---

## Applications

POST /applications

GET /applications/my-applications

GET /applications/:id

---

## Verification

PATCH /verifications/:id/document-verify

PATCH /verifications/:id/field-verify

PATCH /verifications/:id/approve

PATCH /verifications/:id/reject

---

## Payments

GET /payments

GET /payments/:id

POST /payments/release/:applicationId

---

## Notifications

GET /notifications

PATCH /notifications/:id/read

---

## Uploads

POST /uploads/image

POST /uploads/document

POST /uploads/multiple

---

## Dashboard

GET /dashboard/admin

GET /dashboard/officer

GET /dashboard/citizen

---

## Reports

GET /reports/applications

GET /reports/payments

GET /reports/schemes

---

## Response Format

Success Response

{
"success": true,
"message": "Success",
"data": {}
}

Error Response

{
"success": false,
"message": "Error Message",
"errors": []
}
