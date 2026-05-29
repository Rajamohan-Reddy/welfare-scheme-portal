import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",

  clientUrl: process.env.CLIENT_URL,
};
