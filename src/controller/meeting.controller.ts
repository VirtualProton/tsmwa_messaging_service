import { Request, NextFunction, Response } from "express";
import { MeetingCancelledSchema, MeetingReminderSchema, MeetingScheduleSchema } from "../schema/schema";

import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";
// import { Request } from "../types/express";

export const meeting_schedule = async (req: Request, res: Response, next: NextFunction) => {
    console.log("meeting_schedule")
    try {
        const meetings = MeetingScheduleSchema.parse(req.body);
        for (const { phone, firmName, title, date, time, location, agenda, note } of meetings) {
            const today = new Date(date);
            const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");

            const notes =
                (agenda ? `Agenda: ${agenda}` : "") +
                (note ? `\nNote: ${note}` : "");

            console.log( { phone, firmName, title, formattedDate, time, location, agenda, note } );
            const data: any = {
                type: "meeting_schedule",
                to: phone,
                data: [firmName, title, date, time, location, notes]
            }
            
            await sendNotification(data);
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in meeting_schedule controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in meeting_schedule controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}



export const meeting_reminder = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("meeting_schedule")
    try {
        const meetings = MeetingReminderSchema.parse(req.body);
        for (const { phone, firmName, title, date, time, location, starts_in } of meetings) {
            const today = new Date(date);
            const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const data: any = {
                type: "meeting_reminder",
                to: phone,
                data: [firmName, title, formattedDate, time, location, starts_in]
            }
            await sendNotification(data);
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in meeting_reminder controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in meeting_reminder controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}


export const meeting_cancelled = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("meeting_schedule")
    try {
        const meetings = MeetingCancelledSchema.parse(req.body);
        for (const { phone, firmName, title, date, reason } of meetings) {
            const today = new Date(date);
            const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const reasonText = reason ? `due to ${reason}` : ""; // always string, may be empty
            const data: any = {
                type: "meeting_cancelled",
                to: phone,
                data: [firmName, title, formattedDate, reason?`due to ${reasonText}`:"" ]
            }
            await sendNotification(data);
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in meeting_cancelled controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in meeting_cancelled controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}