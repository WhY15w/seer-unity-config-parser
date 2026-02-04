import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const config = {
  feishu: {
    webhookUrl: process.env.FEISHU_WEBHOOK_URL || "",
    secret: process.env.FEISHU_SECRET || "",
  },
};

const sendTextMessage = async (message: string) => {
  try {
    if (!config.feishu.webhookUrl || !config.feishu.secret) {
      console.warn("Feishu webhook URL or secret is not configured.");
      return;
    }
    const { timestamp, sign } = encode(config.feishu.secret);
    const { data } = await axios.post(config.feishu.webhookUrl, {
      timestamp,
      sign,
      msg_type: "text",
      content: {
        text: message,
      },
    });

    console.log("Feishu response data:", data);

    if (data.StatusCode !== 0) {
      console.error("Failed to send message to Feishu:", data);
      return {
        success: false,
        data,
      };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error sending message to Feishu:", error);
    return { success: false, error: error.message };
  }
};

const encode = (secret) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const key = Buffer.from(`${timestamp}\n${secret}`, "utf8");
  const hmac = crypto.createHmac("SHA256", key);
  hmac.update(Buffer.alloc(0));
  const sign = hmac.digest("base64");
  return { timestamp, sign: sign };
};

export { sendTextMessage };
