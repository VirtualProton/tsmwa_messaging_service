import logger from "../utils/logger";
import { getMessageQueue } from "../utils/messageQueue";
const messageQueue = getMessageQueue();


export async function sendNotification(data: any, priority?: number) {
  console.log("Adding job to message queue:", data);
  await messageQueue.add("notification", data, {
    attempts: 5,
    removeOnComplete: true,
    ...(priority !== undefined && { priority }), // 👈 only include if provided
  });

  logger.info(
    `Job added to queue${priority !== undefined ? ` with priority ${priority}` : ""}!`
  );
}
