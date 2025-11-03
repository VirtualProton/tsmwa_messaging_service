"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppTemplates = void 0;
const secrets_1 = require("../secrets");
exports.WhatsAppTemplates = {
    otp: {
        templateSid: secrets_1.OTP_TEMPLATE_ID, // Twilio Content SID
        variables: (otp) => [otp],
    },
    welcome: {
        templateSid: secrets_1.WELCOME_TEMPLATE_ID,
        variables: (firmName) => [firmName],
    },
    partial_payment: {
        templateSid: secrets_1.PARTIAL_PAYMENT_TEMPLATE_ID,
        variables: (firmName, paidAmount, dueAmount, dueDate) => [firmName, paidAmount, dueAmount, dueDate],
    },
    payment_received: {
        templateSid: secrets_1.PAYMENT_RECEIVED_TEMPLATE_ID,
        variables: (firmName, amount, reason, date) => [firmName, amount, reason, date],
    },
    payment_remainder: {
        templateSid: secrets_1.PAYMENT_REMINDER_TEMPLATE_ID,
        variables: (firmName, amount, reason, dueDate) => [firmName, amount, reason, dueDate],
    },
    meeting_schedule: {
        templateSid: secrets_1.MEETING_SCHEDULED_TEMPLATE_ID,
        variables: (firmName, title, date, time, location) => [
            firmName,
            title,
            date,
            time,
            location,
        ],
    },
    meeting_reminder: {
        templateSid: secrets_1.MEETING_REMINDER_TEMPLATE_ID,
        variables: (firmName, title, date, time, location, startsIn) => [
            firmName, title, date, time, location, startsIn
        ],
    },
    meeting_cancelled: {
        templateSid: secrets_1.MEETING_CANCELLED_TEMPLATE_ID,
        variables: (firmName, title, date, resason) => [firmName, title, date, resason],
    },
    membership_expiry: {
        templateSid: secrets_1.MEMBERSHIP_EXPIRY_REMAINDER_TEMPLATE_ID,
        variables: (firmName, date, contact) => [firmName, date, contact],
    },
    membership_expired: {
        templateSid: secrets_1.MEMBERSHIP_EXPIRED_NOTIFICATION_TEMPLATE_ID,
        variables: (firmName, date, contact) => [firmName, date, contact],
    },
    membership_activation: {
        templateSid: secrets_1.MEMBERSHIP_ACTIVATION_TEMPLATE_ID,
        variables: (firmName, fromDate, toDate) => [firmName, fromDate, toDate],
    },
    // membership_declined:{
    //    templateSid: MEMBERSHIP_ACTIVATION_TEMPLATE_ID,
    //   variables: (firmName:string,fromDate: string, toDate:string) => [firmName,fromDate,toDate],
    // },
};
