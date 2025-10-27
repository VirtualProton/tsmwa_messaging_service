import { OTP_TEMPLATE_ID } from "../secrets";

export const WhatsAppTemplates = {
  otp: {
    templateSid: OTP_TEMPLATE_ID, // Twilio Content SID
    variables: (otp: string) => [otp],
  },
  payment_received: {
    templateSid: "HXxxxxxxxxxxxxxx",
    variables: (amount: string, date: string) => [amount, date],
  },
  welcome: {
    templateSid: "HXxxxxxxxxxxxxxx",
    variables: (name: string) => [name],
  },
  meeting_schedule: {
    templateSid: "HXxxxxxxxxxxxxxx",
    variables: (title: string, date: string, time: string, location: string) => [
      title,
      date,
      time,
      location,
    ],
  },
  meeting_reminder: {
    templateSid: "HXxxxxxxxxxxxxxx",
    variables: (title: string, time: string) => [title, time],
  },
};
