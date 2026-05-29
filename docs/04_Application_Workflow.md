# Application Workflow

## Overview

The Welfare Scheme Portal follows a structured workflow to ensure proper verification, approval, and transparency of citizen applications.

Every application moves through predefined statuses until it reaches a final state.

---

# Workflow Lifecycle

Citizen

↓

SUBMITTED

↓

UNDER_VERIFICATION

↓

VERIFIED

↓

APPROVED

OR

REJECTED

OR

CORRECTION_REQUIRED

↓

SUBMITTED

---

# Status Definitions

## DRAFT

Application is created but not submitted.

Citizen can:

- Edit
- Delete

Officer cannot view draft applications.

---

## SUBMITTED

Citizen has successfully submitted the application.

Citizen can:

- View
- Track Status

Citizen cannot:

- Modify Application

Application becomes available for officer review.

---

## UNDER_VERIFICATION

Officer starts reviewing the application.

Verification includes:

- Personal Details Verification
- Eligibility Verification
- Document Verification

---

## CORRECTION_REQUIRED

Officer found issues.

Examples:

- Missing Documents
- Invalid Aadhaar Number
- Incorrect Information

Citizen receives notification.

Citizen updates application and resubmits.

Status returns to:

SUBMITTED

---

## VERIFIED

Officer completed verification successfully.

Application is ready for final decision.

---

## APPROVED

Application meets all eligibility requirements.

Benefits can be processed.

Citizen receives approval notification.

This is a final status.

---

## REJECTED

Application does not meet eligibility criteria.

Officer must provide rejection remarks.

Citizen receives rejection notification.

This is a final status.

---

# Timeline Tracking

Every status change must be recorded.

Example:

SUBMITTED

↓

UNDER_VERIFICATION

↓

CORRECTION_REQUIRED

↓

SUBMITTED

↓

UNDER_VERIFICATION

↓

VERIFIED

↓

APPROVED

---

# Business Rules

Rule 1

Only Citizens can submit applications.

---

Rule 2

Only Officers and Admins can verify applications.

---

Rule 3

Remarks are mandatory for:

- Rejection
- Correction Request

---

Rule 4

Applications cannot be edited after verification starts.

---

Rule 5

Every status change must create a timeline record.

---

# Notification Triggers

Application Submitted

↓

Notification to Officer

---

Correction Required

↓

Notification to Citizen

---

Application Approved

↓

Notification to Citizen

---

Application Rejected

↓

Notification to Citizen
