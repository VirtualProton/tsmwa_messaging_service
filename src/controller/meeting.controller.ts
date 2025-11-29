import { Request, NextFunction, Response } from "express";
import { MeetingCancelledSchema, MeetingReminderSchema, MeetingScheduleSchema } from "../schema/schema";

import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";
// import { Request } from "../types/express";

export const meeting_schedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meetings= MeetingScheduleSchema.parse(req.body);
        for (const { phone,firmName, title, date, time, location, agenda, note } of meetings) {
            const data: any = {
                type: "schedule_meeeting",
                to: phone,
                data: [firmName, title, date, time, location, agenda, note ? `Note:${note}` : ""]
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
        const { phone, ...meetings } = MeetingReminderSchema.parse(req.body);
        for (const ph of phone) {

            const { firmName, title, date, time, location, agenda } = meetings
            // const today = new Date(date);
            // const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const data: any = {
                type: "reminder_meeting",
                to: ph,
                data: [firmName, title, date, time, location, agenda]
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
        const { phone, ...meetings } = MeetingCancelledSchema.parse(req.body);
        for (const ph of phone) {
            const { firmName, title, date, reason } = meetings
            const reasonText = reason ? `due to ${reason}` : ""; // always string, may be empty
            const data: any = {
                type: "cancel_meeting",
                to: ph,
                data: [firmName, title, date, reason ? `${reasonText}` : ""]
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