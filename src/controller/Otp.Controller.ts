import { Request, NextFunction, Response } from "express";
import { AuthHeaderSchema } from "../schema/schema";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";

export const Otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, otp } = AuthHeaderSchema.parse(req.body);
        const data: any = {
            type: "otp",
            to: phone,
            data: [otp]
        }
        await sendNotification(data,1);
        return res.status(200).json({ success: true });

    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in Otp controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in Otp controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error:"An unknown error occurred"
        });
    }
}