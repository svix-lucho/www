import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { usePathname, useRouter } from "next/navigation";
import { WEBHOOK_PROVIDERS } from "@/utils/providers/index";
import { useWebhookProvider } from "@/hooks/useWebhookProvider";
import { ChangeEvent } from "react";

interface IPageHeroProps {
  heading: string;
  description: React.ReactNode;
}

export function PageHero(props: IPageHeroProps) {
  const { heading, description } = props;
  const { provider } = useWebhookProvider();
  const providerId = provider.toLocaleLowerCase();
  const router = useRouter();
  const pathname = usePathname();

  const redirect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const basePath = pathname.split("/")[1];
    router.push(`/${basePath}/${value}`);
  };

  return (
    <Stack spacing={2} py={2}>
      <Heading textAlign="center" size="2xl" as="h1">
        {heading}
      </Heading>
      <Box>{description}</Box>
      <Center py={4}>
        <HStack spacing={4}>
          <NavLink href={`/verify/${providerId}`} name="Verify webhook" />
          <NavLink href={`/simulate/${providerId}`} name="Simulate request" />
        </HStack>
      </Center>

      <Center py={2}>
        <Text textAlign="center" fontWeight="semibold" mr={2}>
          Webhook type
        </Text>
        <Select
          maxW="24em"
          variant="outline"
          value={providerId}
          w="auto"
          onChange={redirect}
        >
          {WEBHOOK_PROVIDERS.map((providerConf) => (
            <option
              key={providerConf.provider.toLocaleLowerCase()}
              value={providerConf.provider.toLocaleLowerCase()}
            >
              {providerConf.provider}
            </option>
          ))}
        </Select>
      </Center>
      <Divider />
    </Stack>
  );
}

interface NavLinkProps {
  href: string;
  name: string;
}

function NavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(props.href.split("/")[1]);

  return (
    <Link as={Button} href={props.href}>
      <Button
        variant={isActive ? "solid" : "ghost"}
        fontWeight={isActive ? 600 : 400}
        colorScheme="blue"
        borderRadius="9999px"
        borderColor={!isActive ? "blue.500" : undefined}
        borderWidth={!isActive ? "1px" : undefined}
      >
        {props.name}
      </Button>
    </Link>
  );
}
