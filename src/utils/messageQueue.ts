// messageQueue.ts
import { Queue } from "bullmq";
import IORedis from "ioredis";
import { REDIS_URL } from "../secrets";

let connection: IORedis | null = null;
let messageQueueInstance: Queue | null = null;

export function getMessageQueue(): Queue {
  if (!connection) {
    connection = new IORedis(REDIS_URL,{
      maxRetriesPerRequest: null // ✅ Required for BullMQ
    });
  }

  if (!messageQueueInstance) {
    messageQueueInstance = new Queue("messageQueue", { connection });
  }

  return messageQueueInstance;
}

export function getIORedisConnection() {
  if (!connection) {
    connection = new IORedis(REDIS_URL,{
      maxRetriesPerRequest: null // ✅ Required for BullMQ
    });
  }

  return connection;
}
