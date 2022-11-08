import { Box, Center, Divider, Stack, Text } from "@chakra-ui/react";
import webhookIcon from "@/app/img/logo-icon-text-white.svg";
import { Image, Link } from "@chakra-ui/next-js";
import C from "@/utils/constants";

export function Footer() {
  return (
    <footer>
      <Center pb={8} pt={16} backgroundColor="#212121">
        <Box w="100%" maxW="1280px" px={5}>
          <Stack spacing={16}>
            <Stack
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              spacing={8}
            >
              <Link href="/" my="auto" color="#CCCCCC">
                <Image h="40px" w="auto" alt="Webhook icon" src={webhookIcon} />
              </Link>
              <Box>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  h="100%"
                  justifyContent="end"
                  spacing={{ base: 4, md: 8 }}
                >
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      fontSize="sm"
                      fontWeight="semibold"
                      color="#CCCCCC"
                    >
                      {link.name.toUpperCase()}
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Stack>
            <Stack spacing={4}>
              <Divider />
              <Text color="#9E9E9E">Standard Webhooks ©</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </footer>
  );
}

const links = [
  {
    name: "The spec",
    href: C.links.spec,
  },
  {
    name: "Github",
    href: C.links.github,
  },
  {
    name: "Contribute",
    href: C.links.contribute,
  },
  {
    name: "Committee",
    href: C.links.committee,
  },
  {
    name: "Tools",
    href: C.links.tools,
  },
  {
    name: "Resources",
    href: C.links.resources,
  },
];
