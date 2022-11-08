"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import Fonts from "@/theme/fonts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
