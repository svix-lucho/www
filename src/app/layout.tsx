"use client";
import "./globals.css";
import "@fontsource/merriweather";
import { Inter } from "next/font/google";
import { Box, Stack } from "@chakra-ui/react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-M6CVKDCG7J"
      ></Script>
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-M6CVKDCG7J');
        `}
      </Script>
      <body className={inter.className}>
        <Providers>
          <Stack minH="100vh">
            <NavBar />
            <Box flex="1">{children}</Box>
            <Footer />
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
