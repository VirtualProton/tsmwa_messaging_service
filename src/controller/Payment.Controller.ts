import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import { BillGeneratedSchema, PartialPaymentRecievedSchema, PaymentRecievedSchema, PaymentRemainderSchema } from "../schema/schema";
import { sendWhatsAppMessage } from "../service/whatsappService";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";

export const BillGenerated = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { phone, firmName, fromDate, toDate, amount } = BillGeneratedSchema.parse(req.body);
        const data: any = {
            type: "bill_generated",
            to: phone,
            data: [phone, firmName, fromDate, toDate, amount]
        }
        await sendNotification(data,1);
        return res.status(200).json({ success: true });
    }catch(err){
        if (err instanceof Error) {
            logger.error(`❌ Error in BillGenerated controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in BillGenerated controller: ${JSON.stringify(err)}`);
        }
        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}
export const PaymentRemainder = async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔔 PaymentRemainder Controller accessed");
    try {
        const { phone, firmName, amount, reason, dueDate } = PaymentRemainderSchema.parse(req.body);
        const today = new Date(dueDate);
        const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
        // const result = await sendWhatsAppMessage("payment_remainder", `+91${phone}`, [firmName, amount, reason, formattedDate]);
        // logger.info(result);
        // return res.status(200).json({ success: true, result });
        const data: any = {
            type: "payment_remainder",
            to: phone,
            data: [firmName, amount, reason, formattedDate]
        }
        await sendNotification(data,2);
        return res.status(200).json({ success: true });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in payment remainder controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in payment remainder controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}



export const PaymentReceived = async (req: Request, res: Response, next: NextFunction) => {

    console.log("🔔 PaymentReceived Controller accessed");

    try {
        const { phone,firmName, fromDate, toDate, receivedAmount, totalReceivedAmount, dueAmount, netAmount } = PaymentRecievedSchema.parse(req.body);
        console.log({ phone,firmName, fromDate, toDate, receivedAmount, totalReceivedAmount, dueAmount, netAmount });

        const data: any = {
            type: "payment_received",
            to: phone,
            data: [firmName, fromDate, toDate, receivedAmount, totalReceivedAmount, dueAmount, netAmount]
        }
        await sendNotification(data,2);
        return res.status(200).json({ success: true });

    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in PaymentReceived controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in PaymentReceived controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}


// export const PartialPaymentReceived = async (req: Request, res: Response, next: NextFunction) => {

//     console.log("🔔 PaymentReceived Controller accessed");

//     try {
//         const { phone, firmName, paidAmount, dueAmount, date } = PartialPaymentRecievedSchema.parse(req.body);

//         const formattedToday = new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");

//         // const result = await sendWhatsAppMessage("partial_payment", `+91${phone}`, [firmName, paidAmount, dueAmount, formattedToday]);

//         // return res.status(200).json({ success: true, result });

//         const data: any = {
//             type: "partial_payment",
//             to: phone,
//             data: [firmName, paidAmount, dueAmount, formattedToday]
//         }
//         await sendNotification(data,2);
//         return res.status(200).json({ success: true });

//     } catch (err) {
//         if (err instanceof Error) {
//             logger.error(`❌ Error in PartialPaymentReceived controller: ${err.message}`, err);
//         } else {
//             logger.error(`❌ Error in PartialPaymentReceived controller: ${JSON.stringify(err)}`);
//         }

//         return res.status(400).json({
//             success: false,
//             error: err instanceof Error ? err.message : "An unknown error occurred"
//         });
//     }
// }