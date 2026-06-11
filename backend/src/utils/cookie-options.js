import { env } from "../config/env.config.js";

const isProduction = env.nodeEnv === "production";

const sharedCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
};

export const accessTokenCookieOptions = {
  ...sharedCookieOptions,
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions = {
  ...sharedCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
};
