import { Request, NextFunction, Response } from "express";
// import { Request } from "../types/express";
import { PartialPaymentRecievedSchema, PaymentRecievedSchema, PaymentRemainderSchema } from "../schema/schema";
import { sendWhatsAppMessage } from "../service/whatsappService";
import logger from "../utils/logger";
import { sendNotification } from "../service/notificationService";

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
        const { phone, firmName, amount, reason, date } = PaymentRecievedSchema.parse(req.body);

        const formattedToday = date
            .toLocaleDateString("en-GB")  // gives dd/mm/yyyy
            .replace(/\//g, "-");         // convert slashes to dashes


        // console.log("✅ PaymentReceived Controller accessed with phone:", phone, "and amount:", amount);
        // const result = await sendWhatsAppMessage("payment_received", `+91${phone}`, [firmName, amount, reason, formattedToday]);

        // return res.status(200).json({ success: true, result });

        const data: any = {
            type: "payment_received",
            to: phone,
            data: [firmName, amount, reason, formattedToday]
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

export const PartialPaymentReceived = async (req: Request, res: Response, next: NextFunction) => {

    console.log("🔔 PaymentReceived Controller accessed");

    try {
        const { phone, firmName, paidAmount, dueAmount, date } = PartialPaymentRecievedSchema.parse(req.body);

        const formattedToday = new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");

        // const result = await sendWhatsAppMessage("partial_payment", `+91${phone}`, [firmName, paidAmount, dueAmount, formattedToday]);

        // return res.status(200).json({ success: true, result });

        const data: any = {
            type: "partial_payment",
            to: phone,
            data: [firmName, paidAmount, dueAmount, formattedToday]
        }
        await sendNotification(data,2);
        return res.status(200).json({ success: true });

    } catch (err) {
        if (err instanceof Error) {
            logger.error(`❌ Error in PartialPaymentReceived controller: ${err.message}`, err);
        } else {
            logger.error(`❌ Error in PartialPaymentReceived controller: ${JSON.stringify(err)}`);
        }

        return res.status(400).json({
            success: false,
            error: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}