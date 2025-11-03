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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = void 0;
const TwilioClient_1 = require("../utils/TwilioClient");
const messageTemplates_1 = require("../config/messageTemplates");
const secrets_1 = require("../secrets");
const FROM = secrets_1.TWILIO_WHATSAPP_NUMBER;
const SERVICE_SID = secrets_1.TWILIO_GENERAL_MESSAGING_SERVICE_SID;
const sendWhatsAppMessage = (type, to, data) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, TwilioClient_1.getTwilioClient)();
    const template = messageTemplates_1.WhatsAppTemplates[type];
    if (!template) {
        throw new Error(`❌ No template found for type: ${type}`);
    }
    // ✅ TypeScript-safe spread
    const variableValues = template.variables(...data);
    const variables = Object.fromEntries(variableValues.map((val, i) => [`${i + 1}`, val]));
    try {
        const message = yield client.messages.create({
            from: FROM,
            to: `whatsapp:${to}`,
            messagingServiceSid: SERVICE_SID,
            contentSid: template.templateSid,
            contentVariables: JSON.stringify(variables),
        });
        console.log(`✅ ${type} message sent to ${to} — SID: ${message.sid}`);
        return message;
    }
    catch (error) {
        console.error(`❌ Failed to send ${type} message to ${to}:`, error.message);
        throw error;
    }
});
exports.sendWhatsAppMessage = sendWhatsAppMessage;
