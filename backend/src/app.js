import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1/health", healthRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/schemes", schemeRoutes);

app.use("/api/v1/scheme-categories", schemeCategoryRoutes);

app.use("/api/v1/applications", applicationRoutes);

app.use("/api/v1/verifications", verificationRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/uploads", uploadRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

export default app;
