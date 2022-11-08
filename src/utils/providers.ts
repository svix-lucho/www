import { ICurlCommandForm } from "@/app/(sections)/simulate/[provider]/CurlCommandForm";
import * as base64 from "@stablelib/base64";
import * as sha256 from "fast-sha256";
import React from "react";

export interface IWebhookVerificationForm {
  [key: string]: string;
  userSignature: string;
}

export type WebhookProviderName =
  | "standard"
  | "svix"
  | "stripe"
  | "github"
  | "hubspot"
  | "shopify"
  | "sendgrid";

export interface IFormConfig {
  provider: string;
  docsLink: string;
  formComponent: React.FC<any>;
  curlFormComponent: React.FC<any>;
  signature: (data: IWebhookVerificationForm) => string;
  curlCommand: (data: ICurlCommandForm) => string;
}

export const genericSignPayload = (secret: string, payload: string) => {
  const encodedSecret = Uint8Array.from(secret, (c) => c.charCodeAt(0));
  const encoder = new TextEncoder();
  const toSign = encoder.encode(payload);
  const expectedSignature = base64.encode(sha256.hmac(encodedSecret, toSign));
  return `${expectedSignature}`;
};
