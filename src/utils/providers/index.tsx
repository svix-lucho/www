import { GITHUB_FORM_CONFIG } from "./github";
import { HUBSPOT_FORM_CONFIG } from "./hubspot";
// import { SENDGRID_FORM_CONFIG } from "./sendgrid";
import { SHOPIFY_FORM_CONFIG } from "./shopify";
import { STANDARD_FORM_CONFIG } from "./standard";
import { STRIPE_FORM_CONFIG } from "./stripe";
import { SVIX_FORM_CONFIG } from "./svix";
// import { TWILIO_FORM_CONFIG } from "./twilio";

export const WEBHOOK_PROVIDERS = [
  STANDARD_FORM_CONFIG,
  GITHUB_FORM_CONFIG,
  HUBSPOT_FORM_CONFIG,
  SHOPIFY_FORM_CONFIG,
  // SENDGRID_FORM_CONFIG,
  STRIPE_FORM_CONFIG,
  SVIX_FORM_CONFIG,
  // TWILIO_FORM_CONFIG
];
