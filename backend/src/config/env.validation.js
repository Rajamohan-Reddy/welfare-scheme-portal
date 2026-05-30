import { env } from "./env.config.js";

const requiredEnvVariables = ["mongoUri", "jwtSecret"];

requiredEnvVariables.forEach((variableName) => {
  if (!env[variableName]) {
    throw new Error(`Missing environment variable: ${variableName}`);
  }
});
