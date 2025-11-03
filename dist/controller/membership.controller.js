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
exports.membership_activation_reminder = exports.membership_expired_reminder = exports.membership_expiry_reminder = void 0;
const schema_1 = require("../schema/schema");
const whatsappService_1 = require("../service/whatsappService");
const logger_1 = __importDefault(require("../utils/logger"));
// import { Request } from "../types/express";
const membership_expiry_reminder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, firmName, date, contact } = schema_1.MembershipExpirySchema.parse(req.body);
        const today = new Date(date);
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("membership_expiry", `+91${phone}`, [firmName, formattedDate, `+91 ${contact}`]);
        logger_1.default.info(result);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in membership_expiry_reminder controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in membership_expiry_reminder controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.membership_expiry_reminder = membership_expiry_reminder;
const membership_expired_reminder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, firmName, date, contact } = schema_1.MembershipExpiredSchema.parse(req.body);
        const today = new Date(date);
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("membership_expired", `+91${phone}`, [firmName, formattedDate, `+91 ${contact}`]);
        logger_1.default.info(result);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in membership_expired_reminder controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in membership_expired_reminder controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.membership_expired_reminder = membership_expired_reminder;
const membership_activation_reminder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, firmName, fromDate, toDate } = schema_1.MembershipActivationSchema.parse(req.body);
        const formattedFromDate = new Date(fromDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        const formattedToDate = new Date(toDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("membership_activation", `+91${phone}`, [firmName, formattedFromDate, formattedToDate]);
        logger_1.default.info(result);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in membership_activation_reminder controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in membership_activation_reminder controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.membership_activation_reminder = membership_activation_reminder;
