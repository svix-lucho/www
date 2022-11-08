import { Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export function FeatureCard(props: FeatureCardProps) {
  const { title, description, icon } = props;
  return (
    <Stack spacing={4} backgroundColor="black.200" p="24px">
      <Icon as={icon} w="32px" h="32px" color="blue.500" />
      <Heading size="md" color="white.500">
        {title}
      </Heading>
      <Text color="white.200">{description}</Text>
    </Stack>
  );
}
