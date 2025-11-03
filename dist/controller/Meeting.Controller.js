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
exports.meeting_cancelled = exports.meeting_reminder = exports.meeting_schedule = void 0;
const schema_1 = require("../schema/schema");
const logger_1 = __importDefault(require("../utils/logger"));
const meetingNotificationService_1 = require("../service/meetingNotificationService");
// import { Request } from "../types/express";
const meeting_schedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("meeting_schedule");
    try {
        const meetings = schema_1.MeetingScheduleSchema.parse(req.body);
        for (const { phone, firmName, title, date, time, location } of meetings) {
            const today = new Date(date);
            const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const data = {
                type: "meeting_schedule",
                to: phone,
                data: [firmName, title, formattedDate, time, location]
            };
            yield (0, meetingNotificationService_1.sendMeetingNotification)(data);
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in meeting_schedule controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in meeting_schedule controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.meeting_schedule = meeting_schedule;
const meeting_reminder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("meeting_schedule")
    try {
        const meetings = schema_1.MeetingReminderSchema.parse(req.body);
        for (const { phone, firmName, title, date, time, location, starts_in } of meetings) {
            const today = new Date(date);
            const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const data = {
                type: "meeting_reminder",
                to: phone,
                data: [firmName, title, formattedDate, time, location, starts_in]
            };
            yield (0, meetingNotificationService_1.sendMeetingNotification)(data);
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in meeting_reminder controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in meeting_reminder controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.meeting_reminder = meeting_reminder;
const meeting_cancelled = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("meeting_schedule")
    try {
        const meetings = schema_1.MeetingCancelledSchema.parse(req.body);
        for (const { phone, firmName, title, date, reason } of meetings) {
            const today = new Date(date);
            const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const data = {
                type: "meeting_cancelled",
                to: phone,
                data: [firmName, title, formattedDate, reason]
            };
            yield (0, meetingNotificationService_1.sendMeetingNotification)(data);
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`❌ Error in meeting_cancelled controller: ${err.message}`, err);
        }
        else {
            logger_1.default.error(`❌ Error in meeting_cancelled controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
});
exports.meeting_cancelled = meeting_cancelled;
