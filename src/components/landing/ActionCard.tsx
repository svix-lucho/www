import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export type ActionCardProps = React.ComponentProps<typeof Stack> & {
  title: string;
  description: string;
  icon: IconType;
  ctaText?: string;
  ctaUrl: string;
};

export function ActionCard(props: ActionCardProps) {
  const { title, description, icon, ctaText, ctaUrl, ...rest } = props;
  return (
    <HStack padding={12} spacing={4} alignItems="space-between" {...rest}>
      <Box alignSelf="start">
        <Icon w="40px" h="40px" color="blue.500" as={icon} />
      </Box>
      <Stack spacing={4} justifyContent="space-between">
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
        <Link as={Button} href={ctaUrl} w="fit-content">
          <Button variant="outline">{ctaText ?? "Learn more"}</Button>
        </Link>
      </Stack>
    </HStack>
  );
}
