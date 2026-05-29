# Testing Checklist

## Purpose

This document helps verify that every feature in the Welfare Scheme Portal works correctly.

Every test must be marked:

PASS ✅

or

FAIL ❌

before final project submission.

---

# Module 1 - User Registration

## Test Case 1

Action:

Register a new citizen account.

Expected Result:

Account created successfully.

Status:

[ ]

---

## Test Case 2

Action:

Register using existing email.

Expected Result:

System shows error message.

Status:

[ ]

---

## Test Case 3

Action:

Leave mandatory fields empty.

Expected Result:

Validation errors displayed.

Status:

[ ]

---

# Module 2 - Login

## Test Case 4

Action:

Login using valid credentials.

Expected Result:

User redirected to dashboard.

Status:

[ ]

---

## Test Case 5

Action:

Login using incorrect password.

Expected Result:

Invalid credentials message displayed.

Status:

[ ]

---

## Test Case 6

Action:

Access protected page without login.

Expected Result:

Redirect to Login Page.

Status:

[ ]

---

# Module 3 - Scheme Management

## Test Case 7

Action:

Admin creates new scheme.

Expected Result:

Scheme appears in scheme list.

Status:

[ ]

---

## Test Case 8

Action:

Admin edits scheme details.

Expected Result:

Changes saved successfully.

Status:

[ ]

---

## Test Case 9

Action:

Admin disables scheme.

Expected Result:

Scheme hidden from citizens.

Status:

[ ]

---

# Module 4 - Application Submission

## Test Case 10

Action:

Citizen submits application.

Expected Result:

Application created successfully.

Status:

[ ]

---

## Test Case 11

Action:

Citizen uploads required documents.

Expected Result:

Documents uploaded successfully.

Status:

[ ]

---

## Test Case 12

Action:

Citizen submits incomplete application.

Expected Result:

Validation error displayed.

Status:

[ ]

---

# Module 5 - Application Tracking

## Test Case 13

Action:

Citizen views application history.

Expected Result:

Application list displayed.

Status:

[ ]

---

## Test Case 14

Action:

Citizen opens application details.

Expected Result:

Complete application information displayed.

Status:

[ ]

---

# Module 6 - Verification Workflow

## Test Case 15

Action:

Officer opens submitted application.

Expected Result:

Application details displayed.

Status:

[ ]

---

## Test Case 16

Action:

Officer requests correction.

Expected Result:

Status changes to CORRECTION_REQUIRED.

Status:

[ ]

---

## Test Case 17

Action:

Officer approves application.

Expected Result:

Status changes to APPROVED.

Status:

[ ]

---

## Test Case 18

Action:

Officer rejects application.

Expected Result:

Status changes to REJECTED.

Status:

[ ]

---

# Module 7 - Notifications

## Test Case 19

Action:

Application approved.

Expected Result:

Citizen receives notification.

Status:

[ ]

---

## Test Case 20

Action:

Correction requested.

Expected Result:

Citizen receives notification.

Status:

[ ]

---

# Module 8 - Dashboard

## Test Case 21

Action:

Open Citizen Dashboard.

Expected Result:

Statistics displayed correctly.

Status:

[ ]

---

## Test Case 22

Action:

Open Officer Dashboard.

Expected Result:

Assigned application statistics displayed.

Status:

[ ]

---

## Test Case 23

Action:

Open Admin Dashboard.

Expected Result:

System statistics displayed.

Status:

[ ]

---

## Test Case 24

Action:

View Pie Charts.

Expected Result:

Chart data matches application records.

Status:

[ ]

---

## Test Case 25

Action:

View Bar Charts.

Expected Result:

Chart data displays correctly.

Status:

[ ]

---

# Module 9 - Role Based Access

## Test Case 26

Action:

Citizen accesses Admin page.

Expected Result:

Access denied.

Status:

[ ]

---

## Test Case 27

Action:

Officer accesses Admin page.

Expected Result:

Access denied.

Status:

[ ]

---

## Test Case 28

Action:

Admin accesses all modules.

Expected Result:

Access granted.

Status:

[ ]

---

# Final Acceptance Checklist

✓ Registration Working

✓ Login Working

✓ JWT Authentication Working

✓ Role Based Access Working

✓ Scheme Management Working

✓ Application Submission Working

✓ Verification Workflow Working

✓ Notifications Working

✓ Dashboard Working

✓ Charts Working

✓ Reports Working

✓ Responsive Design Working

✓ Documentation Updated

✓ README Updated

Project Status:

PASS / FAIL
