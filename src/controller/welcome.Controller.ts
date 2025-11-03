import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import {WelcomeSchema } from "../schema/schema";
import { sendWhatsAppMessage } from "../service/whatsappService";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";

export const welcome = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {firmName,phone} = WelcomeSchema.parse(req.query);
        // const result = await sendWhatsAppMessage("welcome",`+91${phone}`, [firmName]);
        // return res.send({success:true, result});

        const data: any = {
                    type: "welcome",
                    to: phone,
                    data: [firmName]
                }
                await sendNotification(data);
                return res.status(200).json({ success: true });
    }catch(err){
        if (err instanceof Error) {
            logger.error(`❌ Error in welcome controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in welcome controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}