import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
