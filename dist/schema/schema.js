"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingCancelledSchema = exports.MeetingReminderSchema = exports.MeetingScheduleSchema = exports.MembershipActivationSchema = exports.MembershipExpiredSchema = exports.MembershipExpirySchema = exports.PartialPaymentRecievedSchema = exports.PaymentRecievedSchema = exports.PaymentRemainderSchema = exports.WelcomeSchema = exports.AuthHeaderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AuthHeaderSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    otp: zod_1.default.string().regex(/^\d{6,}$/, "Invalid OTP"),
});
exports.WelcomeSchema = zod_1.default.object({
    firmName: zod_1.default.string(),
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits")
});
exports.PaymentRemainderSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string().max(100),
    amount: zod_1.default.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    reason: zod_1.default.string(),
    dueDate: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
});
exports.PaymentRecievedSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    amount: zod_1.default.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    reason: zod_1.default.string(),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
});
exports.PartialPaymentRecievedSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    paidAmount: zod_1.default.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    dueAmount: zod_1.default.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
});
exports.MembershipExpirySchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    contact: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
});
exports.MembershipExpiredSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    contact: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
});
exports.MembershipActivationSchema = zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    fromDate: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    toDate: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
});
exports.MeetingScheduleSchema = zod_1.default.array(zod_1.default.object({
    phone: zod_1.default
        .string()
        .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    title: zod_1.default.string().min(6, "Title must be at least 6 characters"),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    time: zod_1.default.string(),
    location: zod_1.default.string(),
}));
exports.MeetingReminderSchema = zod_1.default.array(zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    title: zod_1.default.string().min(6),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    time: zod_1.default.string(),
    location: zod_1.default.string(),
    starts_in: zod_1.default.string()
}));
exports.MeetingCancelledSchema = zod_1.default.array(zod_1.default.object({
    phone: zod_1.default.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: zod_1.default.string(),
    title: zod_1.default.string().min(6),
    date: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
    }),
    reason: zod_1.default.string()
}));
