// Sentry initialization and configuration
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: "development",
  sendDefaultPii: true,
});
