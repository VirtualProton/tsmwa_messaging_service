import { Request, NextFunction, Response } from "express";
import { NewUser } from "../schema/schema";
import { sendNotification } from "../service/notificationService";
import logger from "../utils/logger";
import { success } from "zod";

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = NewUser.parse(req.body);
        const data:any = {
                type: "new_user",
                to:user.phone,
                data: [user.phone,user.name]
            }
        await sendNotification(data,3);

        return res.json({success:true});
    }catch(err:any){
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