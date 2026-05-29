# Deployment Guide

## Deployment Overview

The Welfare Scheme Portal consists of:

1. Frontend (React Application)
2. Backend (Node.js + Express API)
3. Database (MongoDB Atlas)

---

# Development Environment

## Frontend

Run:

npm install

npm run dev

Default URL:

http://localhost:5173

---

## Backend

Run:

npm install

npm run dev

Default URL:

http://localhost:5000

---

## MongoDB

Development Database:

MongoDB Atlas

Connection stored in:

.env

Example:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/welfare_portal

---

# Environment Variables

Backend .env

PORT=5000

NODE_ENV=development

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=1d

---

# Production Deployment Plan

## Frontend

Platform:

Vercel

Steps:

1. Connect GitHub Repository
2. Select frontend folder
3. Configure Environment Variables
4. Deploy

Expected Output:

Live React Application URL

---

## Backend

Platform:

Render

Steps:

1. Connect GitHub Repository
2. Select backend folder
3. Configure Environment Variables
4. Deploy

Expected Output:

Live API URL

---

## Database

Platform:

MongoDB Atlas

Steps:

1. Create Cluster
2. Create Database User
3. Configure Network Access
4. Copy Connection String
5. Add Connection String to Backend Environment Variables

---

# Production Verification Checklist

After Deployment verify:

✓ Frontend loads successfully

✓ Backend starts successfully

✓ MongoDB connection successful

✓ User Registration works

✓ Login works

✓ JWT Authentication works

✓ Schemes load correctly

✓ Applications can be submitted

✓ Documents upload correctly

✓ Officer can verify applications

✓ Dashboard statistics display correctly

✓ Charts display correctly

✓ Notifications work correctly

---

# Backup Strategy

Before final submission:

1. Push latest code to GitHub
2. Export Postman Collection
3. Export MongoDB Sample Data
4. Store screenshots inside screenshots folder
5. Update README.md

This ensures project recovery in case of deployment issues.
