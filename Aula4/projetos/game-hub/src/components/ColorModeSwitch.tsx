import { HStack, Switch, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";

const ColorModeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <HStack>
      <Switch.Root
        colorPalette="green"
        checked={theme === "dark"}
        onCheckedChange={(e: { checked: boolean }) => setTheme(e.checked ? "dark" : "light")}
      >
        <Switch.HiddenInput />
        <Switch.Control />
      </Switch.Root>
      <Text whiteSpace="nowrap">Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
