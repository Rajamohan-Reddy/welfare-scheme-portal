import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { securityMiddleware } from "./config/security.config.js";

import { requestLogger } from "./middleware/request-logger.middleware.js";

import { apiRateLimiter } from "./middleware/rate-limit.middleware.js";

import { authRateLimiter } from "./middleware/rate-limit.middleware.js";

import officerApplicationRoutes from "./routes/officer-application.routes.js";

import "./docs/auth.docs.js";
import "./docs/scheme-category.docs.js";
import "./docs/scheme.docs.js";
import "./docs/application.docs.js";
import "./docs/verification.docs.js";
import "./docs/payment.docs.js";
import "./docs/notification.docs.js";
import "./docs/dashboard.docs.js";
import "./docs/upload.docs.js";
import "./docs/report.docs.js";

import { env } from "./config/env.config.js";
import { swaggerSpec } from "./config/swagger.config.js";
import { errorHandler } from "./middleware/error.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import schemeRoutes from "./routes/scheme.routes.js";
import schemeCategoryRoutes from "./routes/scheme-category.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import verificationRoutes from "./routes/verification.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reportRoutes from "./routes/report.routes.js";
import adminApplicationRoutes from "./routes/admin-application.routes.js";
import dashboardAnalyticsRoutes from "./routes/dashboard-analytics.routes.js";
import auditLogRoutes from "./routes/audit-log.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import applicationManagementRoutes from "./routes/application-management.routes.js";
import userManagementRoutes from "./routes/user-management.routes.js";
const app = express();

app.disable("x-powered-by");

app.use(securityMiddleware);

app.use(requestLogger);

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use("/uploads", express.static("uploads"));

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(cookieParser());

app.use("/api", apiRateLimiter);

app.use("/api/v1/health", healthRoutes);

app.use(
  "/api/v1/auth",

  authRateLimiter,

  authRoutes,
);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/schemes", schemeRoutes);

app.use("/api/v1/scheme-categories", schemeCategoryRoutes);

app.use("/api/v1/applications", applicationRoutes);

app.use("/api/v1/verifications", verificationRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/uploads", uploadRoutes);

app.use("/api/v1/officer/applications", officerApplicationRoutes);

app.use("/api/v1/admin/applications", adminApplicationRoutes);

app.use("/api/v1/dashboard/analytics", dashboardAnalyticsRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/reports", reportRoutes);

app.use("/api/v1/audit-logs", auditLogRoutes);

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/application-management", applicationManagementRoutes);

app.use("/api/v1/users", userManagementRoutes);
app.use(
  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

app.use(errorHandler);

export default app;
