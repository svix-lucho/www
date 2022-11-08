"use client";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiMenuFill } from "react-icons/ri";
import webhookIcon from "@/app/img/logo-icon-text-bw.svg";
import C from "@/utils/constants";

export function NavBar() {
  return (
    <Box as="section">
      <Box as="nav">
        <Center>
          <Grid
            templateColumns="repeat(2, 1fr)"
            justifyContent="space-between"
            py={3}
            h="80px"
            maxW="1280px"
            w="100%"
            px={4}
          >
            <Link
              as={Button}
              href="/"
              my="auto"
              _hover={{ textDecoration: "none" }}
            >
              <Image h="40px" w="auto" src={webhookIcon} alt="Webhook icon" />
            </Link>
            <HStack
              w="100%"
              display={{ base: "none", md: "flex" }}
              h="100%"
              justifyContent="end"
              spacing={8}
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="#5F5F5F"
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </HStack>
            <Box
              display={{ base: "flex", md: "none" }}
              w="100%"
              justifyContent="end"
            >
              <NavBarDrawer />
            </Box>
          </Grid>
        </Center>
      </Box>
    </Box>
  );
}

function NavBarDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="outline"
        aria-label="Navigation"
        onClick={onOpen}
        icon={<RiMenuFill />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        colorScheme="whiteAlpha"
        returnFocusOnClose={false}
        variant="primary"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            <Stack spacing={8}>
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="#5F5F5F"
                  onClick={onClose}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
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
