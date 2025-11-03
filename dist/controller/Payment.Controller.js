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
exports.PartialPaymentReceived = exports.PaymentReceived = exports.PaymentRemainder = void 0;
// import { Request } from "../types/express";
const schema_1 = require("../schema/schema");
const whatsappService_1 = require("../service/whatsappService");
const logger_1 = __importDefault(require("../utils/logger"));
const PaymentRemainder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔔 PaymentRemainder Controller accessed");
    try {
        const { phone, firmName, amount, reason, dueDate } = schema_1.PaymentRemainderSchema.parse(req.body);
        const today = new Date(dueDate);
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("payment_remainder", `+91${phone}`, [firmName, amount, reason, formattedDate]);
        logger_1.default.info(result);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in payment remainder controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in payment remainder controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.PaymentRemainder = PaymentRemainder;
const PaymentReceived = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔔 PaymentReceived Controller accessed");
    try {
        const { phone, firmName, amount, reason, date } = schema_1.PaymentRecievedSchema.parse(req.body);
        const formattedToday = date
            .toLocaleDateString("en-GB") // gives dd/mm/yyyy
            .replace(/\//g, "-"); // convert slashes to dashes
        // console.log("✅ PaymentReceived Controller accessed with phone:", phone, "and amount:", amount);
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("payment_received", `+91${phone}`, [firmName, amount, reason, formattedToday]);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in PaymentReceived controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in PaymentReceived controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.PaymentReceived = PaymentReceived;
const PartialPaymentReceived = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔔 PaymentReceived Controller accessed");
    try {
        const { phone, firmName, paidAmount, dueAmount, date } = schema_1.PartialPaymentRecievedSchema.parse(req.body);
        const formattedToday = new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("partial_payment", `+91${phone}`, [firmName, paidAmount, dueAmount, formattedToday]);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in PartialPaymentReceived controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in PartialPaymentReceived controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.PartialPaymentReceived = PartialPaymentReceived;
