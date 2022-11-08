"use client";

import { Box, Divider, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { WEBHOOK_PROVIDERS } from "@/utils/providers/index";

export function Footer() {
  return (
    <footer>
      <Box mt={16}>
        <Divider />
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem colSpan={{ sm: 2, md: 1 }}>
            <Stack spacing={0.5} py={8}>
              <Text>Webhook Providers</Text>
              {WEBHOOK_PROVIDERS.map((providerConf) => (
                <FooterLink
                  as={Link}
                  href={`/verify/${providerConf.provider.toLocaleLowerCase()}`}
                  key={providerConf.provider}
                >
                  Tools for {providerConf.provider} Webhooks
                </FooterLink>
              ))}
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </footer>
  );
}

function FooterLink(props: {
  href: string;
  children: React.ReactNode;
  as: any;
}) {
  return (
    <Link href={props.href} as={props.as} fontSize="sm" color="gray.500">
      {props.children}
    </Link>
  );
}
