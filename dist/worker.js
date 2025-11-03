"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const messageQueue_1 = require("./utils/messageQueue");
const whatsappService_1 = require("./service/whatsappService");
const logger_1 = __importDefault(require("./utils/logger"));
const connection = (0, messageQueue_1.getIORedisConnection)();
const worker = new bullmq_1.Worker("messageQueue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, to, data } = job.data;
    console.log(`📨 Processing job ${job.id} for type: ${type}, to: ${to}`);
    const message = yield (0, whatsappService_1.sendWhatsAppMessage)(type, `+91${to}`, data);
    logger_1.default.info(`✅ Message sent to ${to} — SID: ${message.sid}`);
}), { connection });
worker.on("completed", (job) => logger_1.default.info(`✅ Job ${job.id} completed`));
worker.on("failed", (job, err) => logger_1.default.error(`❌ Job ${job.id} failed: ${err.message}`));
