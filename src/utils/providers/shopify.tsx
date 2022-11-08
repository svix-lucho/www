import { ICurlCommandForm } from "@/app/(sections)/simulate/[provider]/CurlCommandForm";
import {
  IFormConfig,
  IWebhookVerificationForm,
  genericSignPayload,
} from "../providers";
import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { FormCodeBlock } from "@/components/FormCodeBlock";
import { PayloadEditor } from "@/components/PayloadEditor";
import { SecretInput } from "@/components/SecretInput";

const ShopifyVerificationForm = (props: { control: any; errors: any }) => {
  const { control, errors } = props;
  return (
    <>
      <Box>
        <Heading as="h3" size="md" mb={2} p={0}>
          Generate signature
        </Heading>
        <Text fontSize="sm">
          Shopify webhook signatures are generated using HMAC with SHA-256.
        </Text>
      </Box>
      <Stack spacing={2} border="1px solid" borderColor="gray.100" p={4} mt={0}>
        <FormCodeBlock>HMACSHA256(</FormCodeBlock>

        <HStack px={4}>
          <Box w="100%" maxW="60em">
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

const ShopifyRequestSignatureForm = (props: {
  control: any;
  errors: any;
  setValue: any;
}) => {
  const { control, errors } = props;
  return (
    <Stack spacing={2}>
      <FormCodeBlock fontSize={14}>HMACSHA256(</FormCodeBlock>

      <HStack pl={4}>
        <FormCodeBlock fontSize={14}>{"{raw_payload},"}</FormCodeBlock>
      </HStack>

      <HStack pl={4}>
        <SecretInput name="secret" control={control} errors={errors} />
      </HStack>
      <FormCodeBlock fontSize={14}>)</FormCodeBlock>
    </Stack>
  );
};

export const SHOPIFY_FORM_CONFIG: IFormConfig = {
  provider: "Shopify",
  docsLink:
    "https://shopify.dev/docs/apps/webhooks/configuration/https#step-5-verify-the-webhook",
  formComponent: ShopifyVerificationForm,
  curlFormComponent: ShopifyRequestSignatureForm,
  signature: (data: IWebhookVerificationForm) =>
    genericSignPayload(data.secret, `${data.rawPayload}`),
  curlCommand: (data: ICurlCommandForm) => {
    const { rawPayload, destinationUrl } = data;
    const signature = genericSignPayload(data.secret, `${data.rawPayload}`);

    return `curl -X POST "${destinationUrl}" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "X-Shopify-Hmac-SHA256: ${signature}" \\
  -d '${rawPayload}'`;
  },
};
