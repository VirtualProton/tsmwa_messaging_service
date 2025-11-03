import fs from "fs";
import path from "path";
import { createLogger, format, transports } from "winston";
// ensure log folder exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logger = createLogger({
  level: "info", // Log levels: 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to file
    new transports.File({ filename: "logs/combined.log" }), // Log all levels to file
  ],
});

export default logger;

// helper function to read logs
export const getErrorLog = () => {
  const filePath = path.join(logDir, "error.log");
  if (!fs.existsSync(filePath)) return "No error logs found.";
  return fs.readFileSync(filePath, "utf8");
};

export const getCombinedLog = () => {
  const filePath = path.join(logDir, "combined.log");
  if (!fs.existsSync(filePath)) return "No combined logs found.";
  return fs.readFileSync(filePath, "utf8");
};