import z from "zod";

export const AuthHeaderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    otp: z.string().regex(/^\d{6,}$/, "Invalid OTP"),
});

export const NewUser = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    name: z.string()
});

export const MemberSignConfirmationSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    membershipId: z.string()
});

export const PaymentRemainderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string().max(100),

    fromDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    toDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),

    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
});

export const BillGeneratedSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string().nonempty("Firm name is required"),
    fromDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),

    toDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
});

export const PaymentRecievedSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string().nonempty("Firm name is required"),
    fromDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    // .transform((val) => {
    //     const [day, month, year] = val.split("-");
    //     return new Date(`${year}-${month}-${day}`);
    // }),

    toDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    // .transform((val) => {
    //     const [day, month, year] = val.split("-");
    //     return new Date(`${year}-${month}-${day}`);
    // }),   
    receivedAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    totalReceivedAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    dueAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    netAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
});

export const PartialPaymentRecievedSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    paidAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    dueAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
});

export const MembershipExpirySchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
    contact: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
});

export const MembershipExpiredSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
    contact: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
});

export const MembershipActivationSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    fromDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    toDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
});

export const MeetingScheduleSchema = z.array(
    z.object({
        phone: z
            .string()
            .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
        firmName: z.string(),
        title: z.string().min(6, "Title must be at least 6 characters"),
        date: z
            .string()
            .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
        time: z.string().nonempty("Time is required"),
        location: z.string().nonempty("Location is required"),
        agenda: z.string().optional(),
        note: z.string().optional()
    }));

    
export const MeetingReminderSchema = z.object({
    phone: z.array(z
        .string()
        .regex(/^\d{10}$/, "Phone must be exactly 10 digits")),
    firmName: z.string(),
    title: z.string().min(6),
    date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    time: z.string(),
    location: z.string(),
    agenda: z.string()
});

export const MeetingCancelledSchema = z.object({
    phone: z.array(z
        .string()
        .regex(/^\d{10}$/, "Phone must be exactly 10 digits")),
    firmName: z.string(),
    title: z.string().min(6),
    date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY"),
    reason: z.string().optional()
});



