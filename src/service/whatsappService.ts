import { getTwilioClient } from "../utils/TwilioClient";
import { WhatsAppTemplates } from "../config/messageTemplates";
import { TWILIO_GENERAL_MESSAGING_SERVICE_SID, TWILIO_WHATSAPP_NUMBER } from "../secrets";

const FROM = TWILIO_WHATSAPP_NUMBER;
const SERVICE_SID = TWILIO_GENERAL_MESSAGING_SERVICE_SID;

type WhatsAppMessageType = keyof typeof WhatsAppTemplates;

export const sendWhatsAppMessage = async (
  type: WhatsAppMessageType,
  to: string,
  data: string[] = [] // default empty for templates with no vars
) => {
  const client = getTwilioClient();
  const template = WhatsAppTemplates[type];

  if (!template) {
    throw new Error(`❌ No template found for type: ${type}`);
  }

  // 🧠 Handle templates with or without variables
  const variableFn = template.variables;
  const variableValues = typeof variableFn === "function"
    ? (variableFn as (...args: string[]) => string[])(...data)
    : [];

  // 🧩 Optional safety: warn if wrong number of variables passed
  if (data.length && variableValues.length !== data.length) {
    console.warn(
      `⚠️ Variable count mismatch for template "${type}": expected ${variableValues.length}, got ${data.length}`
    );
  }

  // ✅ Format Twilio Content Variables
  const variables = Object.fromEntries(
    variableValues.map((val, i) => [`${i + 1}`, val])
  );

  console.log(`📨 Sending "${type}" message to ${to} with variables:`, variables);

  try {
    const message = await client.messages.create({
      from: FROM,
      to: `whatsapp:${to}`,
      messagingServiceSid: SERVICE_SID,
      contentSid: template.templateSid,
      contentVariables: Object.keys(variables).length
        ? JSON.stringify(variables)
        : undefined, // omit if no variables
    });

    console.log(`✅ "${type}" message sent to ${to} — SID: ${message.sid}`);
    return message;
  } catch (error: any) {
    console.error(`❌ Failed to send "${type}" message to ${to}:`, error.message);
    throw error;
  }
};
