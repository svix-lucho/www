"use client";
import { Box, Container, Text } from "@chakra-ui/react";
import { PageHero } from "@/components/PageHero";
import { Link } from "@chakra-ui/next-js";
import { useWebhookProvider } from "@/hooks/useWebhookProvider";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const providerConfig = useWebhookProvider();

  return (
    <>
      <Box py={8} px={4}>
        <Container maxW="6xl" p={0}>
          <PageHero
            heading={`Simulate ${providerConfig.provider} Webhooks`}
            description={
              <>
                <Text textAlign="center">
                  {`This tool lets you simulate a ${providerConfig.provider} webhook message, along with its corresponding signature.`}
                </Text>
                <Text textAlign="center">
                  Read more about{" "}
                  <Link
                    href={providerConfig.docsLink}
                    fontWeight={500}
                    target="_blank"
                  >
                    {`how the ${providerConfig.provider} webhook signature is generated `}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                  .
                </Text>
              </>
            }
          />
          {children}
        </Container>
      </Box>
    </>
  );
}
