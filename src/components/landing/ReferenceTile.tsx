import { Link, Image } from "@chakra-ui/next-js";
import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface ReferenceTileProps {
  title: string;
  icon: string | IconType;
  iconColor?: string;
  url: string;
}

export function ReferenceTile(props: ReferenceTileProps) {
  const { title, icon, iconColor, url } = props;

  return (
    <Link href={url} style={{ textDecoration: "none" }}>
      <Box backgroundColor="black.300" p={8}>
        <HStack>
          {typeof icon === "function" ? (
            // IconType
            <Icon as={icon} h="32px" w="32px" color={iconColor || "blue.500"} />
          ) : (
            <Image src={icon} w="32px" h="32px" alt="" />
          )}
          <Text fontWeight="bold">{title}</Text>
        </HStack>
      </Box>
    </Link>
  );
}
