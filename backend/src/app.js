import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { securityMiddleware } from "./config/security.config.js";

import { requestLogger } from "./middleware/request-logger.middleware.js";

import { apiRateLimiter } from "./middleware/rate-limit.middleware.js";

import { authRateLimiter } from "./middleware/rate-limit.middleware.js";

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

import { swaggerSpec } from "./config/swagger.config.js";
import { errorHandler } from "./middleware/error.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import schemeRoutes from "./routes/scheme.routes.js";
import schemeCategoryRoutes from "./routes/scheme-category.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import verificationRoutes from "./routes/verification.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

app.use(securityMiddleware);

app.use(requestLogger);

import { env } from "./config/env.config.js";

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(cookieParser());

app.use("/api", apiRateLimiter);

app.use("/api/v1/health", healthRoutes);

app.use(
  "/api/v1/auth",

  authRateLimiter,

  authRoutes,
);

app.use("/api/v1/schemes", schemeRoutes);

app.use("/api/v1/scheme-categories", schemeCategoryRoutes);

app.use("/api/v1/applications", applicationRoutes);

app.use("/api/v1/verifications", verificationRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/uploads", uploadRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/reports", reportRoutes);

app.use(
  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

app.use(errorHandler);

export default app;
