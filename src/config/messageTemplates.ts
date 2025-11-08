import { MEETING_CANCELLED_TEMPLATE_ID, MEETING_REMINDER_TEMPLATE_ID, MEETING_SCHEDULED_TEMPLATE_ID, MEMBERSHIP_ACTIVATION_TEMPLATE_ID, MEMBERSHIP_EXPIRED_NOTIFICATION_TEMPLATE_ID, MEMBERSHIP_EXPIRY_REMAINDER_TEMPLATE_ID, NEW_USER_TEMPLATE_ID, OTP_TEMPLATE_ID, PARTIAL_PAYMENT_TEMPLATE_ID, PAYMENT_RECEIVED_TEMPLATE_ID, PAYMENT_REMINDER_TEMPLATE_ID, WELCOME_TEMPLATE_ID } from "../secrets";

export const WhatsAppTemplates = {
  otp: {   //Complated
    templateSid: OTP_TEMPLATE_ID, // Twilio Content SID
    variables: (otp: string) => [otp],
  },

  welcome: { //---
    templateSid: WELCOME_TEMPLATE_ID,
    variables: (firmName: string) => [firmName],
  },
  new_user:{
    templateSid:NEW_USER_TEMPLATE_ID,
    variables:(phone:string, name:string, url="https://app.tsmwa.online") => [name,phone,url]
  },
  partial_payment:{ //----
    templateSid: PARTIAL_PAYMENT_TEMPLATE_ID,
    variables: (firmName:string, paidAmount: string, dueAmount:string, dueDate: string) => [firmName,paidAmount,dueAmount,dueDate],
  },

  payment_received: {
    templateSid: PAYMENT_RECEIVED_TEMPLATE_ID,
    variables: (firmName:string, fromDate:string, toDate:string, receivedAmount:string, totalReceivedAmount:string, dueAmount:string, netAmount:string ) => [firmName, fromDate, toDate, receivedAmount, totalReceivedAmount, dueAmount, netAmount ],
  },

  payment_remainder: {
    templateSid: PAYMENT_REMINDER_TEMPLATE_ID,
    variables: (firmName: string, amount: string,reason:string, dueDate: string, ) => [firmName,amount,reason, dueDate],
  },


  meeting_schedule: {
    templateSid: MEETING_SCHEDULED_TEMPLATE_ID,
    variables: (firmName:string, title: string, date: string, time: string, location: string, note:string) => [
      firmName,
      title,
      date,
      time,
      location,
      note
    ],
  },


  meeting_reminder: {
    templateSid: MEETING_REMINDER_TEMPLATE_ID,
    variables: (firmName:string, title: string, date: string, time: string, location: string, startsIn:string) => [
      firmName, title, date, time, location, startsIn
    ],
  },

  meeting_cancelled: {
    templateSid: MEETING_CANCELLED_TEMPLATE_ID,
    variables: (firmName:string,title: string, date: string, resason:string) => [firmName,title,date,resason],
  },



  
  membership_expiry:{
    templateSid: MEMBERSHIP_EXPIRY_REMAINDER_TEMPLATE_ID,
    variables: (firmName:string,date: string, contact:string) => [firmName,date,contact],
  },

  membership_expired:{
     templateSid: MEMBERSHIP_EXPIRED_NOTIFICATION_TEMPLATE_ID,
    variables: (firmName:string,date: string, contact:string) => [firmName,date,contact],
  },
  membership_activation:{
     templateSid: MEMBERSHIP_ACTIVATION_TEMPLATE_ID,
    variables: (firmName:string,fromDate: string, toDate:string) => [firmName,fromDate,toDate],
  },
  // membership_declined:{
  //    templateSid: MEMBERSHIP_ACTIVATION_TEMPLATE_ID,
  //   variables: (firmName:string,fromDate: string, toDate:string) => [firmName,fromDate,toDate],
  // },

};
