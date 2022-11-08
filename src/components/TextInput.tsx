import { InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  LayoutProps,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

interface ITextInputProps {
  name: string;
  placeholder: string;
  tooltip?: string;
  warning?: React.ReactNode;
  helperText?: string | React.ReactNode;

  w?: LayoutProps["w"];
  actionButton?: React.ReactNode;

  // TODO: remove anys
  control: any;
  errors: any;
  rules: any;
}

export function TextInput(props: ITextInputProps) {
  const {
    control,
    helperText,
    errors,
    warning,
    rules,
    name,
    placeholder,
    actionButton,
    tooltip,
    w = { base: "15rem", md: "25rem" },
  } = props;

  const hasError = errors[name] !== undefined;
  const hasWarning = warning !== undefined;
  const hasHelperText = helperText !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl isInvalid={!!errors[name]} w="auto">
          <InputGroup size="sm" w={w}>
            <Input
              {...field}
              placeholder={placeholder}
              fontFamily="ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
              _placeholder={{
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
              variant="filled"
            />
            <InputRightElement>
              {actionButton}
              {tooltip && (
                <Tooltip label={tooltip} aria-label={tooltip}>
                  <InfoIcon />
                </Tooltip>
              )}
            </InputRightElement>
          </InputGroup>
          {hasHelperText && (
            <Text variant="caption" fontSize="sm" color="gray.500" pt={1}>
              {helperText}
            </Text>
          )}
          {hasError && (
            <FormErrorMessage>
              {errors[name] && errors[name].message}
            </FormErrorMessage>
          )}
          {!hasError && hasWarning && <>{warning}</>}
        </FormControl>
      )}
    />
  );
}
