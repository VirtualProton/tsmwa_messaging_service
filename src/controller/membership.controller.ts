import { Request, NextFunction, Response } from "express";
import { MembershipActivationSchema, MembershipExpiredSchema, MembershipExpirySchema } from "../schema/schema";
import { sendWhatsAppMessage } from "../service/whatsappService";
import logger from "../utils/logger";
// import { Request } from "../types/express";

export const membership_expiry_reminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, firmName,  date,contact } = MembershipExpirySchema.parse(req.body);
        const today = new Date(date);
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = await sendWhatsAppMessage("membership_expiry", `+91${phone}`, [firmName,formattedDate,`+91 ${contact}`]);
        logger.info(result);
        return res.status(200).json({ success: true, result });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in membership_expiry_reminder controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in membership_expiry_reminder controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}

export const membership_expired_reminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, firmName,  date,contact } = MembershipExpiredSchema.parse(req.body);
        const today = new Date(date);
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = await sendWhatsAppMessage("membership_expired", `+91${phone}`, [firmName,formattedDate,`+91 ${contact}`]);
        logger.info(result)
        return res.status(200).json({ success: true, result });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in membership_expired_reminder controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in membership_expired_reminder controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}

export const membership_activation_reminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, firmName,  fromDate,toDate } = MembershipActivationSchema.parse(req.body);
        const formattedFromDate = new Date(fromDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        const formattedToDate = new Date(toDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        const result = await sendWhatsAppMessage("membership_activation", `+91${phone}`, [firmName,formattedFromDate,formattedToDate]);
        logger.info(result);
        return res.status(200).json({ success: true, result });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in membership_activation_reminder controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in membership_activation_reminder controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}



