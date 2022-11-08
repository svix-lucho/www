"use client";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Center,
  HStack,
  Heading,
  Link as ChakraLink,
  IconButton,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { SlackButton } from "./SlackButton";

const POPUP_FEATURES = {
  popup: "true",
  width: 600,
  height: 700,
  top: "auto",
  left: "auto",
  toolbar: "no",
  menubar: "no",
};

const getWindowFeatures = () => {
  return Object.entries(POPUP_FEATURES)
    .reduce((str, [key, value]) => {
      if (value === "auto") {
        if (key === "top") {
          const v = Math.round(
            window.innerHeight / 2 - POPUP_FEATURES.height / 2
          );
          str += `top=${v},`;
        } else if (key === "left") {
          const v = Math.round(
            window.innerWidth / 2 - POPUP_FEATURES.width / 2
          );
          str += `left=${v},`;
        }
        return str;
      }

      str += `${key}=${value},`;
      return str;
    }, "")
    .slice(0, -1);
};

export default function SlackApp() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [endpointURL, setEndpointURL] = useState("");
  const [externalPopup, setExternalPopup] = useState<Window | null>();
  const { onCopy, setValue } = useClipboard("");

  const fetchToken = async (code: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/slack/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, redirectUri: getRedirectUri() }),
      });

      const data = await res.json();
      setEndpointURL(data.incoming_webhook.url);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue(endpointURL);
  }, [endpointURL, setValue]);

  useEffect(() => {
    setEndpointURL("");

    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      try {
        const currentUrl = externalPopup.location.href;
        if (!currentUrl) {
          return;
        }
        const searchParams = new URL(currentUrl).searchParams;
        const code = searchParams.get("code");
        const error_code = searchParams.get("error");

        if (code) {
          externalPopup.close();

          fetchToken(code);

          setExternalPopup(undefined);
          clearInterval(timer);
        } else if (error_code) {
          externalPopup.close();

          if (error_code === "access_denied") {
            console.log("access denied");
          }

          setExternalPopup(undefined);
          clearInterval(timer);
        }
      } catch (err) {
        // silently ignore
      }
    }, 100);
  }, [externalPopup]);

  const onAddToSlack = () => {
    const strWindowsFeatures = getWindowFeatures();

    const popup = window.open(
      getAuthorizationURL(),
      "_blank",
      strWindowsFeatures
    );
    setExternalPopup(popup);
  };

  const onCopyButton = () => {
    onCopy();
    toast({
      title: "Copied to clipboard",
      status: "info",
      duration: 3000,
      variant: "subtle",
    });
  };

  const hasEndpoint = endpointURL.length > 0;

  return (
    <Center pt={24}>
      <Stack spacing={8}>
        <Heading textAlign="center" fontWeight="black">
          Slack Incoming Webhooks
        </Heading>

        <Stack spacing={1}>
          <Text textAlign="center">
            This app gives you a shortcut to get a Slack Incoming Webhooks
            endpoint.
          </Text>
          <Text textAlign="center">
            You can use this endpoint to send messages to a Slack channel.
          </Text>
        </Stack>
        <Center>
          {hasEndpoint ? (
            <HStack>
              <Tag p={2} pl={4} fontSize="md">
                <TagLabel
                  fontFamily="ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                  fontWeight="bold"
                >
                  {endpointURL}
                </TagLabel>

                <Tooltip label="Copy to clipboard">
                  <IconButton
                    ml={2}
                    aria-label="Copy to clipboard"
                    icon={<CopyIcon />}
                    onClick={onCopyButton}
                  />
                </Tooltip>
              </Tag>
            </HStack>
          ) : (
            <SlackButton isLoading={isLoading} onClick={onAddToSlack}>
              Connect to Slack
            </SlackButton>
          )}
        </Center>

        <Text textAlign="center">
          Learn more about how Incoming Webhooks work in{" "}
          <ChakraLink
            color="blue.500"
            as={Link}
            href="https://api.slack.com/messaging/webhooks"
            target="_blank"
          >
            Slack's documentation
            <ExternalLinkIcon mx="2px" mt="-2px" />
          </ChakraLink>
        </Text>
      </Stack>
    </Center>
  );
}

const clientId = "1949106774466.5559259320660";

const getAuthorizationURL = () => {
  return `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=incoming-webhook&redirect_uri=${getRedirectUri()}`;
};

const getRedirectUri = () => {
  let redirectUri = `${window.location.origin}/slack/authorize`;

  // To make it work in localhost
  if (process.env.NODE_ENV === "development") {
    redirectUri = `https://redirectmeto.com/${redirectUri}`;
  }

  return redirectUri;
};
