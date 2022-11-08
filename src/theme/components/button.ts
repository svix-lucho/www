const Button = {
  baseStyle: {
    borderRadius: "0",
    textTransform: "uppercase",
    padding: "8px 18px 8px 18px",
  },
  variants: {
    solid: {
      fontSize: "sm",
      bg: "blue.500",
      color: "white",
      _hover: {
        bg: "blue.600",
      },
      _active: {
        bg: "blue.700",
      },
    },
    outline: {
      fontSize: "sm",
      borderColor: "#262626",
    },
    rounded: {
      fontSize: "sm",
    },
    ghost: {
      fontSize: "sm",
    },
  },
};

export default Button;
