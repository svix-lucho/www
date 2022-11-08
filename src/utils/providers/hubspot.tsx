import { IFormConfig, IWebhookVerificationForm } from "../providers";
import * as base64 from "@stablelib/base64";
import * as sha256 from "fast-sha256";
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ICurlCommandForm } from "@/app/(sections)/simulate/[provider]/CurlCommandForm";
import { FormCodeBlock } from "@/components/FormCodeBlock";
import { TextInput } from "@/components/TextInput";
import { PayloadEditor } from "@/components/PayloadEditor";
import { SecretInput } from "@/components/SecretInput";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { getCurrentTimestamp } from "../curl";

// TODO: add support for HTTP method selection (POST is hardcoded)
const signPayload = (data: IWebhookVerificationForm) => {
  const encodedSecret = Uint8Array.from(data.secret, (c) => c.charCodeAt(0));
  const encoder = new TextEncoder();
  const toSign = encoder.encode(
    `POST${data.requestUri}${data.rawPayload}${data.webhookTimestamp}`
  );
  const expectedSignature = base64.encode(sha256.hmac(encodedSecret, toSign));

  return `${expectedSignature}`;
};

export const HubspotVerificationForm = (props: {
  control: any;
  errors: any;
}) => {
  const { control, errors } = props;
  return (
    <>
      <Box>
        <Heading as="h3" size="md" mb={2} p={0}>
          Generate signature
        </Heading>
        <Text fontSize="sm">
          Hubspot webhook signatures are generated using HMAC with SHA-256.
        </Text>
        <Text fontSize="sm">
          The signed content is composed by concatenating the request method,
          the URI, payload and timestamp.
        </Text>
      </Box>
      <Box border="1px solid" borderColor="gray.100" p={4} mt={0}>
        <Stack spacing={2}>
          <FormCodeBlock>HMACSHA256(</FormCodeBlock>

          <HStack pl={4}>
            <FormCodeBlock>{"'POST' + "}</FormCodeBlock>
          </HStack>

          <HStack pl={4}>
            <TextInput
              name="requestUri"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value:
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                  message:
                    "Invalid request URI. It must contain the protocol (http/https).",
                },
              }}
              placeholder="request URI"
              tooltip="The request URI where this webhook was sent."
              errors={errors}
            />
            <FormCodeBlock>{" + "}</FormCodeBlock>
          </HStack>

          <HStack pl={4}>
            <Box w="60rem" maxWidth="100%">
              <PayloadEditor name="rawPayload" control={control} />
            </Box>
            <FormCodeBlock>{" + "}</FormCodeBlock>
          </HStack>

          <HStack pl={4}>
            <TextInput
              name="webhookTimestamp"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Webhook timestamp must be numeric",
                },
              }}
              placeholder="webhook timestamp"
              tooltip="Timestamp in seconds since epoch"
              errors={errors}
            />
            <FormCodeBlock>,</FormCodeBlock>
          </HStack>

          <HStack pl={4}>
            <SecretInput name="secret" control={control} errors={errors} />
          </HStack>
          <FormCodeBlock>)</FormCodeBlock>
        </Stack>
      </Box>
    </>
  );
};

const HubspotRequestSignatureForm = (props: {
  control: any;
  errors: any;
  setValue: any;
}) => {
  const { control, errors, setValue } = props;
  return (
    <Stack spacing={2}>
      <FormCodeBlock fontSize={14}>HMACSHA256(</FormCodeBlock>

      <HStack pl={4}>
        <FormCodeBlock fontSize={{ base: 12, md: 14 }}>
          {"'POST' + {destinationURL} + {raw_payload} + "}
        </FormCodeBlock>
      </HStack>

      <HStack pl={4}>
        <TextInput
          name="webhookTimestamp"
          control={control}
          w={{ base: "15rem", md: "15rem" }}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "Webhook timestamp must be numeric",
            },
          }}
          placeholder="webhook-timestamp"
          errors={errors}
          actionButton={
            <Tooltip label="Refresh timestamp" fontSize="sm">
              <IconButton
                variant="ghost"
                size="sm"
                icon={<RepeatClockIcon />}
                aria-label="Refresh timestamp"
                onClick={() => {
                  setValue("webhookTimestamp", getCurrentTimestamp());
                }}
              >
                Refresh
              </IconButton>
            </Tooltip>
          }
        />
      </HStack>

      <HStack pl={4}>
        <SecretInput name="secret" control={control} errors={errors} />
      </HStack>
      <FormCodeBlock fontSize={14}>)</FormCodeBlock>
    </Stack>
  );
};

export const HUBSPOT_FORM_CONFIG: IFormConfig = {
  provider: "Hubspot",
  docsLink:
    "https://developers.hubspot.com/docs/api/webhooks/validating-requests",
  formComponent: HubspotVerificationForm,
  curlFormComponent: HubspotRequestSignatureForm,
  signature: signPayload,
  curlCommand: (data: ICurlCommandForm) => {
    const { rawPayload, destinationUrl } = data;
    const signature = signPayload({
      requestUri: data.destinationUrl,
      secret: data.secret,
      rawPayload: data.rawPayload,
      userSignature: "",
    });

    return `curl -X POST "${destinationUrl}" \\
-H "Accept: application/json" \\
-H "Content-Type: application/json" \\
-H "X-HubSpot-Request-Timestamp: ${data.webhookTimestamp}" \\
-H "X-HubSpot-Signature-v3: ${signature}" \\
-d '${rawPayload}'`;
  },
};
