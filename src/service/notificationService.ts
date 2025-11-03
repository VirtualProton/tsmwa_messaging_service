import logger from "../utils/logger";
import { getMessageQueue } from "../utils/messageQueue";
const messageQueue = getMessageQueue();
export async function sendNotification(data:any) {
    
  await messageQueue.add("meeting_notification", data, {
    attempts: 5,
    removeOnComplete: true,
  });
  logger.info("Job added to queue!");
}
