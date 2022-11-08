import { Box, Center, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Image, ImageProps, Link } from "@chakra-ui/next-js";
import { RiGithubFill, RiTwitterFill } from "react-icons/ri";
export interface ProfileCardProps {
  name: string;
  title: string;
  company: string;
  profile: ImageProps["src"];
  logo: ImageProps["src"];
  logoLink: string;
  twitter?: string;
  github?: string;
}

export function ProfileCard(props: ProfileCardProps) {
  return (
    <Stack
      backgroundColor="#fff"
      p={{ base: 4, md: 6 }}
      w="100%"
      maxW="280px"
      spacing={4}
    >
      <Box w="100%">
        <Box position="relative">
          <Image
            src={props.profile}
            maxW="200px"
            maxH="200px"
            w="100%"
            h="100%"
            style={{ objectFit: "cover" }}
            alt={props.name}
            title={props.name}
          />

          <Link href={props.logoLink}>
            <Box
              backgroundColor="black.300"
              className="rounded"
              position="absolute"
              h={{ base: "55px", md: "70px" }}
              w={{ base: "55px", md: "70px" }}
              bottom="0"
              right="0"
              p={{ base: 1, md: 1.5 }}
            >
              <Image
                src={props.logo}
                className="rounded"
                style={{ objectFit: "cover" }}
                h="100%"
                w="100%"
                alt={props.company}
                title={props.company}
              />
            </Box>
          </Link>
        </Box>
      </Box>
      <Stack spacing={1}>
        <HStack>
          <Text fontWeight="bold" fontSize="lg">
            {props.name}
          </Text>
          <HStack>
            {props.github && (
              <Center>
                <Link href={props.github}>
                  <Icon as={RiGithubFill} h="24px" w="24px" color="gray.400" />
                </Link>
              </Center>
            )}
            {props.twitter && (
              <Center>
                <Link href={props.twitter}>
                  <Icon as={RiTwitterFill} h="24px" w="24px" color="gray.400" />
                </Link>
              </Center>
            )}
          </HStack>
        </HStack>
        <Text fontSize="sm">
          {props.title} at <Link href={props.logoLink}>{props.company}</Link>
        </Text>
      </Stack>
    </Stack>
  );
}
