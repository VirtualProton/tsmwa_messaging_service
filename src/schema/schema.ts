import z from "zod";

export const AuthHeaderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    otp: z.string().regex(/^\d{6,}$/, "Invalid OTP"),
});


export const WelcomeSchema = z.object({
    firmName: z.string(),
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits")
});

export const PaymentRemainderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string().max(100),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    reason: z.string(),
    dueDate: z.coerce.date() 
});

export const PaymentRecievedSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    reason: z.string(),
    date: z.coerce.date(),
});

export const PartialPaymentRecievedSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    paidAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    dueAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    date: z.coerce.date(),
});

export const MembershipExpirySchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    date: z.coerce.date(),
    contact: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
});

export const MembershipExpiredSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    date: z.coerce.date(),
    contact: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
});

export const MembershipActivationSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    fromDate: z.coerce.date(),
    toDate: z.coerce.date(),
});

export const MeetingScheduleSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    title: z.string().min(6),
    date_time: z.coerce.date(),
    location:z.string()
});

export const MeetingReminderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    title: z.string().min(6),
    date_time: z.coerce.date(),
    location:z.string(),
    starts_in:z.string()
});

export const MeetingCancelledSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    title: z.string().min(6),
    date_time: z.coerce.date(),
    reason: z.string()
});



