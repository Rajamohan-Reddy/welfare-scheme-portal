# API Contracts

## Base URL

/api/v1

---

# Standard Success Response

{
"success": true,
"message": "Operation completed successfully",
"data": {}
}

---

# Standard Error Response

{
"success": false,
"message": "Error message",
"errors": []
}

---

# Authentication Module

## Register Citizen

POST

/api/v1/auth/register

Request

{
"firstName": "Raja",
"lastName": "K",
"email": "[raja@gmail.com](mailto:raja@gmail.com)",
"password": "Password@123",
"phoneNumber": "9876543210",
"aadhaarNumber": "123456789012"
}

Response

{
"success": true,
"message": "User registered successfully"
}

---

## Login

POST

/api/v1/auth/login

Request

{
"email": "[raja@gmail.com](mailto:raja@gmail.com)",
"password": "Password@123"
}

Response

{
"success": true,
"token": "JWT_TOKEN"
}

---

# Schemes Module

## Get All Schemes

GET

/api/v1/schemes

---

## Get Scheme By ID

GET

/api/v1/schemes/:id

---

## Create Scheme

POST

/api/v1/schemes

Admin Only

---

## Update Scheme

PUT

/api/v1/schemes/:id

Admin Only

---

## Delete Scheme

DELETE

/api/v1/schemes/:id

Admin Only

---

# Applications Module

## Submit Application

POST

/api/v1/applications

Citizen Only

---

## Get My Applications

GET

/api/v1/applications/my

Citizen Only

---

## Get Application By ID

GET

/api/v1/applications/:id

---

## Update Application

PUT

/api/v1/applications/:id

Before Verification Only

---

# Verification Module

## Verify Application

PATCH

/api/v1/applications/:id/verify

Officer/Admin

---

## Approve Application

PATCH

/api/v1/applications/:id/approve

Officer/Admin

---

## Reject Application

PATCH

/api/v1/applications/:id/reject

Officer/Admin

---

## Request Correction

PATCH

/api/v1/applications/:id/correction

Officer/Admin

---

# Dashboard Module

## Admin Dashboard

GET

/api/v1/dashboard/admin

---

## Officer Dashboard

GET

/api/v1/dashboard/officer

---

## Citizen Dashboard

GET

/api/v1/dashboard/citizen
