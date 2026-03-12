// Discord sentry webhook handler
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

router.post("/sentry", express.json(), async (req, res) => {
  try {
    const sentryEvent = req.body;

    const issue = sentryEvent?.data?.issue;
    const event = sentryEvent?.data?.event;

    const level = issue?.level || event?.level || "error";
    const title = issue?.title || event?.title || "New Sentry Alert";
    const environment =
      issue?.environment || event?.environment || "production";
    const project = sentryEvent?.data?.project?.slug || "Unknown";
    const location = event?.culprit || issue?.culprit || "Unknown";
    const func =
      event?.exception?.values?.[0]?.stacktrace?.frames?.slice(-1)?.[0]
        ?.function || "Unknown";
    const web_url = issue?.permalink || event?.web_url || null;

    const colorMap = {
      fatal: 0xff0000,
      error: 0xff0000,
      warning: 0xffa500,
      info: 0x3498db,
      debug: 0x95a5a6,
    };
    const color = colorMap[level] || 0xff0000;

    const discordPayload = {
      username: "Sentry Alert",
      avatar_url:
        "https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png",
      embeds: [
        {
          color,
          description: `🔴 **[${level}] ${title}**\n\`\`\`${title}\`\`\``,
          fields: [
            {
              name: "Environment",
              value: `\`${environment}\``,
              inline: true,
            },
            {
              name: "Project",
              value: web_url ? `[${project}](${web_url})` : project,
              inline: true,
            },
            {
              name: "Location",
              value: `\`${location}\``,
              inline: false,
            },
            {
              name: "Function",
              value: `\`${func}\``,
              inline: false,
            },
          ],
        },
      ],
    };

    await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
    res.status(200).json({ success: true, message: "Alert sent to Discord" });
  } catch (error) {
    console.error("Error forwarding to Discord:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
