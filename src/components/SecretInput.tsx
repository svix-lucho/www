import { useController } from "react-hook-form";
import { TextInput } from "./TextInput";
import { Alert } from "@chakra-ui/react";

export function SecretInput(props: {
  name: string;
  control: any;
  errors: any;
  validate?: (secret: string) => boolean;
}) {
  const { name, control, errors, validate } = props;
  const { field } = useController({ name, control });
  const containsWhitespacePadding =
    field.value && (field.value.startsWith(" ") || field.value.endsWith(" "));

  return (
    <TextInput
      name={name}
      control={control}
      rules={{
        required: true,
        validate: {
          validFormat: (secret: string) => {
            if (validate && !validate(secret)) {
              return "Invalid secret format";
            }
            return undefined;
          },
        },
      }}
      placeholder="your-endpoint-secret"
      tooltip="The signing secret associated with your endpoint. For example: whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw."
      errors={errors}
      warning={
        containsWhitespacePadding ? (
          <Alert status="warning" mt="2px" sx={{ fontSize: "sm" }}>
            Secret contains whitespace padding. This will affect the generated
            signature.
          </Alert>
        ) : undefined
      }
    />
  );
}
