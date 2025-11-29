import { Request, NextFunction, Response } from "express";
import { MembershipActivationSchema, MemberSignConfirmationSchema } from "../schema/schema";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";


// export const membership_activation_reminder = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { phone, firmName, fromDate, toDate } = MembershipActivationSchema.parse(req.body);
//         const formattedFromDate = new Date(fromDate).toLocaleDateString("en-GB").replace(/\//g, "-");
//         const formattedToDate = new Date(toDate).toLocaleDateString("en-GB").replace(/\//g, "-");
//         // const result = await sendWhatsAppMessage("membership_activation", `+91${phone}`, [firmName,formattedFromDate,formattedToDate]);
//         // logger.info(result);
//         const data: any = {
//             type: "membership_activation",
//             to: phone,
//             data: [firmName, formattedFromDate, formattedToDate]
//         }
//         await sendNotification(data);
//         return res.status(200).json({ success: true });
//     } catch (err) {
//         if (err instanceof Error) {
//             logger.error(`❌ Error in membership_activation_reminder controller: ${err.message}`, err);
//         } else {
//             logger.error(`❌ Error in membership_activation_reminder controller: ${JSON.stringify(err)}`);
//         }

//         return res.status(400).json({
//             success: false,
//             error: err instanceof Error ? err.message : "An unknown error occurred"
//         });
//     }
// }

export const membership_activation_confirmation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, firmName, fromDate, toDate } = MembershipActivationSchema.parse(req.body);
        // const formattedFromDate = new Date(fromDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        // const formattedToDate = new Date(toDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        const data: any = {
            type: "membership_activation",
            to: phone,
            data: [firmName, fromDate, toDate]
        }
        await sendNotification(data,1);
        return res.status(200).json({ success: true });
    }catch (err) {

        if (err instanceof Error) {
            logger.error(`❌ Error in membership_activation_confirmation controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in membership_activation_confirmation controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error:"An unknown error occurred"
        });
    }
};


export const MemberSigninConfirmation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone, firmName, membershipId } = MemberSignConfirmationSchema.parse(req.body);
        const data: any = {
            type: "member_signup_confirmation",
            to: phone,
            data: [firmName, membershipId]
        }
        await sendNotification(data, 1);
        return res.status(200).json({ success: true });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in welcome controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in welcome controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: "An unknown error occurred"
        });
    }
}

