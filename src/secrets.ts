import e from 'cors';
import dotenv from 'dotenv';

dotenv.config({path:'.env'});

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const SID = process.env.TWILIO_SID!;
export const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
export const DATABASE_URL = process.env.DATABASE_URL!;

export const REDIS_URL = process.env.REDIS_URL!;
export const CLIENT_ID = process.env.CLIENT_ID!;
export const CLIENT_SECRET = process.env.CLIENT_SECRET!;

export const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER!;
export const TWILIO_AUTH_MESSAGING_SERVICE_SID = process.env.TWILIO_AUTH_MESSAGING_SERVICE_SID!; 
export const TWILIO_GENERAL_MESSAGING_SERVICE_SID = process.env.TWILIO_GENERAL_MESSAGING_SERVICE_SID!;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;

export const OTP_TEMPLATE_ID = process.env.OTP_TEMPALTE_ID!; //working
export const MEMBER_SIGNUP_CONFIRMATION_TEMPLATE_ID = process.env.MEMBER_SIGNUP_CONFIRMATION_TEMPLATE_ID!;
export const NEW_USER_TEMPLATE_ID = process.env.NEW_USER_TEMPLATE_ID!;
export const MEMBERSHIP_ACTIVATION_TEMPLATE_ID = process.env.MEMBERSHIP_ACTIVATION_TEMPLATE_ID!;
export const MEMBERSHIP_BILL_GENERATED_TEMPLATE_ID = process.env.MEMBERSHIP_BILL_GENERATED_TEMPLATE_ID!;


export const MEETING_SCHEDULE_TEMPLATE_ID = process.env.MEETING_SCHEDULE_TEMPLATE_ID!;
export const MEETING_CANCEL_TEMPLATE_ID = process.env.MEETING_CANCEL_TEMPLATE_ID!;
export const MEETING_UPDATE_TEMPLATE_ID = process.env.MEETING_UPDATE_TEMPLATE_ID!;
export const MEETING_REMINDER_TEMPLATE_ID = process.env.MEETING_REMINDER_TEMPLATE_ID!;


export const PAYMENT_REMINDER_TEMPLATE_ID = process.env.PAYMENT_REMINDER_TEMPLATE_ID!;
export const PAYMENT_RECEIVED_TEMPLATE_ID = process.env.PAYMENT_RECEIVED_TEMPLATE_ID!;

