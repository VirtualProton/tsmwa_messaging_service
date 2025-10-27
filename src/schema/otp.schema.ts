import z from "zod";

export const AuthHeaderSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "phone must be exactly 10 digits"),
    otp: z.string().regex(/^\d{6,}$/, "Invalid OTP"),
});
