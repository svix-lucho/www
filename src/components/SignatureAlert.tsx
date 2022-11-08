import { Alert, AlertIcon, AlertProps, Box } from "@chakra-ui/react";

export function SignatureAlert(props: {
  status: AlertProps["status"];
  text: string;
}) {
  const { status, text } = props;

  return (
    <Alert status={status} variant="subtle">
      <AlertIcon />
      <Box>{text}</Box>
    </Alert>
  );
}
