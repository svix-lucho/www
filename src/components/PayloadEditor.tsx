import { Controller } from "react-hook-form";
import { CodeEditor } from "./CodeEditor";
import { Alert } from "@chakra-ui/react";
import { isValidJson } from "@/utils/jsonUtils";

export function PayloadEditor(props: { name: string; control: any }) {
  const { control, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value || "";
        const hasWhitespacePadding =
          value.startsWith(" ") || value.endsWith(" ");

        return (
          <>
            <CodeEditor
              {...field}
              value={value}
              language="json"
              placeholder='{"event_type":"ping","data":{"success":true}}'
              tooltip="The raw payload of the webhook message. You need to use the raw request body when verifying webhooks, as the cryptographic signature is sensitive to even the slightest changes. You should watch out for frameworks that parse the request as JSON and then strigify it because this too will break the signature verification."
            />
            {hasWhitespacePadding && (
              <Alert status="warning" mt="2px" sx={{ fontSize: "sm" }}>
                Payload contains whitespace padding. This will affect the
                generated signature.
              </Alert>
            )}
            {!hasWhitespacePadding && !isValidJson(value) && (
              <Alert status="warning" mt="2px" sx={{ fontSize: "sm" }}>
                Payload is not a valid JSON object
              </Alert>
            )}
          </>
        );
      }}
    />
  );
}
