import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import { BillGeneratedSchema, PaymentRecievedSchema, PaymentRemainderSchema } from "../schema/schema";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";

export const GenerateBill = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { phone, firmName, fromDate, toDate, amount } = BillGeneratedSchema.parse(req.body);
        const data: any = {
            type: "membership_bill_generated",
            to: phone,
            data: [firmName, fromDate, toDate, amount]
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
        const { phone, firmName, fromDate, toDate, amount } = PaymentRemainderSchema.parse(req.body);
        const formattedFromDate = new Date(fromDate).toLocaleDateString("en-GB").replace(/\//g, "-");
        const formattedToDate = new Date(toDate).toLocaleDateString("en-GB").replace(/\//g, "-");

        const data: any = {
            type: "payment_reminder",
            to: phone,
            data: [firmName, formattedFromDate, formattedToDate, amount]
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
            error:"An unknown error occurred"
        });
    }
}
