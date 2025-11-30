import { Request, NextFunction, Response } from "express";
import logger, { getCombinedLog, getErrorLog } from "../utils/logger";

export const getLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.query; // ?type=error or ?type=combined
        const logs = type === "error" ? getErrorLog() : getCombinedLog();
        res.type("text/plain").send(logs);
    } catch (err: any) {
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