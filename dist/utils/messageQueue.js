"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageQueue = getMessageQueue;
exports.getIORedisConnection = getIORedisConnection;
// messageQueue.ts
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const secrets_1 = require("../secrets");
let connection = null;
let messageQueueInstance = null;
function getMessageQueue() {
    if (!connection) {
        connection = new ioredis_1.default(secrets_1.REDIS_URL, {
            maxRetriesPerRequest: null // ✅ Required for BullMQ
        });
    }
    if (!messageQueueInstance) {
        messageQueueInstance = new bullmq_1.Queue("messageQueue", { connection });
    }
    return messageQueueInstance;
}
function getIORedisConnection() {
    if (!connection) {
        connection = new ioredis_1.default(secrets_1.REDIS_URL, {
            maxRetriesPerRequest: null // ✅ Required for BullMQ
        });
    }
    return connection;
}
