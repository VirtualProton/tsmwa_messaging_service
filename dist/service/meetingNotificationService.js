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
exports.sendMeetingNotification = sendMeetingNotification;
const logger_1 = __importDefault(require("../utils/logger"));
const messageQueue_1 = require("../utils/messageQueue");
const messageQueue = (0, messageQueue_1.getMessageQueue)();
function sendMeetingNotification(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield messageQueue.add("meeting_notification", data, {
            attempts: 5,
            removeOnComplete: true,
        });
        logger_1.default.info("Job added to queue!");
    });
}
