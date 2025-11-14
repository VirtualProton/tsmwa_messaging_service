import { Worker } from "bullmq";
import { getIORedisConnection } from "./utils/messageQueue";
import { sendWhatsAppMessage } from "./service/whatsappService";
import logger from "./utils/logger";
import { getTwilioClient } from "./utils/TwilioClient";

const connection = getIORedisConnection();
const client = getTwilioClient();
const worker = new Worker(
  "messageQueue",
  async (job) => {
    const { type, to, data } = job.data as {
      type: keyof typeof import("./config/messageTemplates").WhatsAppTemplates;
      to: string;
      data: string[];
    };


    console.log(`📨 Processing job ${job.id} for type: ${type}, to: ${to}`);
    console.log(`Data: ${JSON.stringify(data)}`);

    const message = await sendWhatsAppMessage(type, `+91${to}`, data);

    logger.info(`✅ Message sent to ${to} — SID: ${message.sid}`);
    const msg = await client.messages(message.sid).fetch();
    console.log(msg);
  },
  { connection }
);

worker.on("completed", (job) => logger.info(`✅ Job ${job.id} completed`));
worker.on("failed", (job:any, err) =>
  logger.error(`❌ Job ${job.id} failed: ${err.message}`)
);
