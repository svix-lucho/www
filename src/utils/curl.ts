import { ICurlCommandForm } from "@/app/(sections)/simulate/[provider]/CurlCommandForm";
import { Webhook } from "svix";

// TODO: we need one for each provider
export const buildCurlCommand = (form: ICurlCommandForm) => {
  const { rawPayload, secret, webhookTimestamp, webhookId, destinationUrl } =
    form;

  const signature = new Webhook(secret).sign(
    webhookId,
    new Date(parseInt(webhookTimestamp) * 1000),
    rawPayload
  );

  const cmd = `curl -X POST "${destinationUrl}" \\
    -H "Accept: application/json" \\
    -H "Content-Type: application/json" \\
    -H "webhook-id: ${webhookId}" \\
    -H "webhook-timestamp: ${webhookTimestamp}" \\
    -H "webhook-signature: ${signature}" \\
    -d '${rawPayload}'`;

  return cmd;
};

export function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export const getCurrentTimestamp = () => {
  const d = new Date();
  return Math.floor(d.getTime() / 1000).toString();
};
