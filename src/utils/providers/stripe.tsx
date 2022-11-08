import { ICurlCommandForm } from "@/app/(sections)/simulate/[provider]/CurlCommandForm";
import {
  IFormConfig,
  IWebhookVerificationForm,
  genericSignPayload,
} from "../providers";
import {
  Box,
  Code,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FormCodeBlock } from "@/components/FormCodeBlock";
import { TextInput } from "@/components/TextInput";
import { PayloadEditor } from "@/components/PayloadEditor";
import { SecretInput } from "@/components/SecretInput";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { getCurrentTimestamp } from "../curl";

const StripeVerificationForm = (props: { control: any; errors: any }) => {
  const { control, errors } = props;
  return (
    <>
      <Box>
        <Heading as="h3" size="md" mb={2} p={0}>
          Generate signature
        </Heading>
        <Text fontSize="sm">
          Stripe signatures are generated using HMAC with SHA-256.
        </Text>
        <Text fontSize="sm">
          The signed content is composed by concatenating the timestamp and
          payload, separated by the full-stop character (<Code>.</Code>){" "}
        </Text>
      </Box>
      <Stack spacing={2} border="1px solid" borderColor="gray.100" p={4} mt={0}>
        <FormCodeBlock>HMACSHA256(</FormCodeBlock>

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
            placeholder="webhook-timestamp"
            tooltip="Timestamp in seconds since epoch"
            errors={errors}
          />
          <FormCodeBlock>{" + '.' + "}</FormCodeBlock>
        </HStack>

        <HStack px={4}>
          <Box w="100%" maxWidth="60rem">
            <PayloadEditor name="rawPayload" control={control} />
          </Box>
          <FormCodeBlock>,</FormCodeBlock>
        </HStack>

        <HStack pl={4}>
          <SecretInput name="secret" control={control} errors={errors} />
        </HStack>
        <FormCodeBlock>)</FormCodeBlock>
      </Stack>
    </>
  );
};

const StripeRequestSignatureForm = (props: {
  control: any;
  errors: any;
  setValue: any;
}) => {
  const { control, errors, setValue } = props;
  return (
    <Stack spacing={2}>
      <FormCodeBlock fontSize={14}>HMACSHA256(</FormCodeBlock>

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
      <Box pl={4}>
        <FormCodeBlock fontSize={14}>{"+ '.{raw_payload}',"}</FormCodeBlock>
      </Box>

      <HStack pl={4}>
        <SecretInput name="secret" control={control} errors={errors} />
      </HStack>
      <FormCodeBlock fontSize={14}>)</FormCodeBlock>
    </Stack>
  );
};

export const STRIPE_FORM_CONFIG: IFormConfig = {
  provider: "Stripe",
  docsLink: "https://stripe.com/docs/webhooks/signatures",
  formComponent: StripeVerificationForm,
  curlFormComponent: StripeRequestSignatureForm,
  signature: (data: IWebhookVerificationForm) =>
    genericSignPayload(
      data.secret,
      `${data.webhookTimestamp}.${data.rawPayload}`
    ),

  curlCommand: (data: ICurlCommandForm) => {
    const { rawPayload, destinationUrl } = data;
    const signature = `t=${data.webhookTimestamp},v1=${genericSignPayload(
      data.secret,
      `${data.webhookTimestamp}.${data.rawPayload}`
    )}`;

    return `curl -X POST "${destinationUrl}" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "Stripe-Signature: ${signature}" \\
  -d '${rawPayload}'`;
  },
};
