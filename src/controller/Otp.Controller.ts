import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import { AuthHeaderSchema } from "../schema/schema";
import { sendWhatsAppMessage } from "../service/whatsappService";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";

export const Otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, otp } = AuthHeaderSchema.parse(req.body);
        // const result:any = await sendWhatsAppMessage("otp",`+91${phone}`, [otp]);
        // if(result["success"]){
        //     logger.info(result);
        //     return res.status(200).json({success: true, message:"Successfully sent the notification"});
        // }else{
        //     logger.info(result);
        //     return res.status(400).json({success: false, message:"failed to send the notification"});
        // }

        const data: any = {
            type: "otp",
            to: phone,
            data: [otp]
        }
        await sendNotification(data);
        return res.status(200).json({ success: true });

    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in Otp controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in Otp controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}