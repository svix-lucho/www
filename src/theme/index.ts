import { extendTheme } from "@chakra-ui/react";

import Button from "./components/button";
import Drawer from "./components/drawer";

const overrides = {
  fonts: {
    body: "Barlow, sans-serif",
    heading: "Barlow, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    black: {
      100: "#5F5F5F",
      200: "#333333",
      300: "#F3F4F7",
      400: "#5F5F5F",
      500: "#1F1F1F",
    },
    white: {
      200: "#CCCCCC",
      500: "#FFFFFF",
    },
    blue: {
      500: "#0075FF",
    },
  },
  components: {
    Button,
    Drawer,
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
      },
    },
  },
};

export default extendTheme(overrides);
