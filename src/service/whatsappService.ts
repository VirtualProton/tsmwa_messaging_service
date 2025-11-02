import { getTwilioClient } from "../utils/TwilioClient";
import { WhatsAppTemplates } from "../config/messageTemplates";
import {TWILIO_GENERAL_MESSAGING_SERVICE_SID, TWILIO_WHATSAPP_NUMBER } from "../secrets";

const FROM = TWILIO_WHATSAPP_NUMBER;
const SERVICE_SID = TWILIO_GENERAL_MESSAGING_SERVICE_SID;

type WhatsAppMessageType = keyof typeof WhatsAppTemplates;

export const sendWhatsAppMessage = async (
  type: WhatsAppMessageType,
  to: string,
  data: string[]
) => {
  const client = getTwilioClient();
  const template = WhatsAppTemplates[type];

  if (!template) {
    throw new Error(`❌ No template found for type: ${type}`);
  }

  // ✅ TypeScript-safe spread
  const variableValues = (template.variables as (...args: string[]) => string[])(...data);

  const variables = Object.fromEntries(
     variableValues.map((val, i) => [`${i + 1}`, val]) 
  );

  try {
    const message = await client.messages.create({
      from: FROM,
      to: `whatsapp:${to}`,
      messagingServiceSid: SERVICE_SID,
      contentSid: template.templateSid,
      contentVariables: JSON.stringify(variables),
    });

    console.log(`✅ ${type} message sent to ${to} — SID: ${message.sid}`);
    return message;
  } catch (error: any) {
    console.error(`❌ Failed to send ${type} message to ${to}:`, error.message);
    throw error;
  }
};
