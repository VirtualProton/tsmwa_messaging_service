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
exports.welcome = void 0;
// import { Request } from "../types/express";
const schema_1 = require("../schema/schema");
const whatsappService_1 = require("../service/whatsappService");
const logger_1 = __importDefault(require("../utils/logger"));
const welcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firmName, phone } = schema_1.WelcomeSchema.parse(req.query);
        const result = yield (0, whatsappService_1.sendWhatsAppMessage)("welcome", `+91${phone}`, [firmName]);
        return res.send({ success: true, result });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in welcome controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in welcome controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.welcome = welcome;
