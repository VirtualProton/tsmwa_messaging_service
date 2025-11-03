import z from "zod";

export const AuthHeaderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    otp: z.string().regex(/^\d{6,}$/, "Invalid OTP"),
});

export const NewUser = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    name: z.string()
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
    dueDate:  z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
});

export const PaymentRecievedSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    reason: z.string(),
    date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
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
    fromDate:  z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
    toDate:  z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
        .transform((val) => {
            const [day, month, year] = val.split("-");
            return new Date(`${year}-${month}-${day}`);
        }),
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
      .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
      .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
      }),
    time: z.string(),
    location: z.string(),
  })
);

export const MeetingReminderSchema =z.array( z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    title: z.string().min(6),
    date: z
      .string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
      .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
      }),
    time: z.string(),
    location: z.string(),
    starts_in: z.string()
}));

export const MeetingCancelledSchema = z.array( z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    firmName: z.string(),
    title: z.string().min(6),
    date: z
      .string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be DD-MM-YYYY")
      .transform((val) => {
        const [day, month, year] = val.split("-");
        return new Date(`${year}-${month}-${day}`);
      }),
    reason: z.string()
}));



