import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import { AuthHeaderSchema } from "../schema/otp.schema";
import { sendWhatsAppMessage } from "../service/whatsappService";

export const Otp = async (req:Request, res:Response, next:NextFunction)=>{
    console.log("🔔 OTP Controller accessed");
    try{
        const {phone,otp} = AuthHeaderSchema.parse(req.body);
        console.log("✅ OTP Controller accessed with phone:", phone, "and otp:", otp);
        const result = await sendWhatsAppMessage("otp",`+91${phone}`, [otp]);
        return res.status(200).json({success: true, result});
    }catch(err){
        console.error("❌ Error in Otp controller:", err);
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}