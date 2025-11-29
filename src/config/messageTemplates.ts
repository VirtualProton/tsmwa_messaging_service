import { MEETING_CANCEL_TEMPLATE_ID, MEETING_REMINDER_TEMPLATE_ID, MEETING_SCHEDULE_TEMPLATE_ID, MEETING_UPDATE_TEMPLATE_ID, MEMBER_SIGNUP_CONFIRMATION_TEMPLATE_ID, MEMBERSHIP_ACTIVATION_TEMPLATE_ID, MEMBERSHIP_BILL_GENERATED_TEMPLATE_ID, NEW_USER_TEMPLATE_ID, OTP_TEMPLATE_ID, PAYMENT_RECEIVED_TEMPLATE_ID, PAYMENT_REMINDER_TEMPLATE_ID } from "../secrets";

console.table({
  OTP_TEMPLATE_ID,
  MEMBER_SIGNUP_CONFIRMATION_TEMPLATE_ID
});

export const WhatsAppTemplates = {
  otp: {   //working
    templateSid: OTP_TEMPLATE_ID, // Twilio Content SID
    variables: (otp: string) => [otp],
  },
  new_user: { //done
    templateSid: NEW_USER_TEMPLATE_ID,
    variables: (phone: string, name: string, url = "https://app.tsmwa.online") => [name, phone, url]
  },
  member_signup_confirmation: { //done
    templateSid: MEMBER_SIGNUP_CONFIRMATION_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, membershipId:string) => [firmName, membershipId]
  },

  membership_activation: { //done
    templateSid: MEMBERSHIP_ACTIVATION_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, fromDate:string, toDate:string) => [firmName, fromDate, toDate],
  },

  membership_bill_generated: { //done
    templateSid: MEMBERSHIP_BILL_GENERATED_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, fromDate:string, toDate:string, amount:string) => [firmName, fromDate, toDate, amount],
  },
  payment_reminder:{ //done
    templateSid: PAYMENT_REMINDER_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, fromDate:string, toDate:string, amount:string) => [firmName, fromDate, toDate,amount],
  },
  payment_received:{//done
    templateSid: PAYMENT_RECEIVED_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, fromDate:string, toDate:string, receivedAmount:string, totalReceivedAmount:string, dueAmount:string, netAmount:string) => [firmName, fromDate, toDate,receivedAmount, totalReceivedAmount, dueAmount, netAmount],
  },
  schedule_meeeting: {
    templateSid: MEETING_SCHEDULE_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, title:string, date:string, time:string, location:string, agenda:string, note:string) => [firmName, title, date, time, location, agenda, note]
  },
  cancel_meeting: {
    templateSid: MEETING_CANCEL_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, title:string, date:string, reason:string) => [firmName, title, date, reason]
  },

  update_meeting: {
    templateSid: MEETING_UPDATE_TEMPLATE_ID, // Twilio Content SID
    variables: (firmName:string, title:string, date:string, time:string, location:string, agenda:string, note:string) => [firmName, title, date, time, location, agenda, note]
  },
  
  reminder_meeting:{
     templateSid:MEETING_REMINDER_TEMPLATE_ID,
     variables:(firmName:string, title:string, date:string, time:string, location:string,agenda:string) =>[firmName, title, date, time, location, agenda]
  }
};
