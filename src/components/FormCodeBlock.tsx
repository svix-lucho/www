import { Code, ResponsiveValue } from "@chakra-ui/react";

export function FormCodeBlock(props: {
  children: React.ReactNode;
  fontSize?: ResponsiveValue<number>;
}) {
  const { children, fontSize = 16 } = props;

  return (
    <Code
      variant="subtle"
      p={0}
      m={0}
      bgColor="transparent"
      fontSize={fontSize}
    >
      {children}
    </Code>
  );
}
