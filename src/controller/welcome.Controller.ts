import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import {WelcomeSchema } from "../schema/schema";
import { sendWhatsAppMessage } from "../service/whatsappService";
import logger from "../utils/logger";

export const welcome = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {firmName,phone} = WelcomeSchema.parse(req.query);
        const result = await sendWhatsAppMessage("welcome",`+91${phone}`, [firmName]);
        return res.send({success:true, result});
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