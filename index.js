import "./instrument.js";
import express from "express";
import * as Sentry from "@sentry/node";
import webhookRouter from "./webhook.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
  try {
    console.log(webhookRouter.test());
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).send("Internal Server Errors");
    console.log(error);
  }
});

app.use("/webhooks", webhookRouter);
Sentry.setupExpressErrorHandler(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
