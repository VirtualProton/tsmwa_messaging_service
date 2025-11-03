"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwilioClient = void 0;
const twilio_1 = __importDefault(require("twilio"));
let twilioClient = null;
const getTwilioClient = () => {
    if (!twilioClient) {
        twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    return twilioClient;
};
exports.getTwilioClient = getTwilioClient;
