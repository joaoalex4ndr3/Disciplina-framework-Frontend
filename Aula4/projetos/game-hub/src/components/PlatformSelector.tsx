import { Button, Menu } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms, { Platform } from "../hooks/usePlatforms";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data } = usePlatforms();
  return (
    <Menu.Root positioning={{ placement: "bottom-start" }}>
      {/* Chakra UI v3 type definitions incorrectly omit children prop when
          using asChild. See: https://github.com/chakra-ui/chakra-ui/issues/10348 */}
      {/* @ts-expect-error */}
      <Menu.Trigger asChild>
        <Button>
          {selectedPlatform?.name || "Platforms"}
          <BsChevronDown />
        </Button>
      </Menu.Trigger>
      {/* Chakra UI v3 type definitions incorrectly omit children prop.
          See: https://github.com/chakra-ui/chakra-ui/discussions/9306 */}
      {/* @ts-expect-error */}
      <Menu.Positioner>
        {/* @ts-expect-error */}
        <Menu.Content>
          {data.map((platform) => (
            // @ts-expect-error - Chakra UI v3 type def bug
            <Menu.Item
              value={platform.name}
              onClick={() => onSelectPlatform(platform)}
              key={platform.id}
            >
              {platform.name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default PlatformSelector;
