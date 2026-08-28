import { Button, Menu } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  sortOrder: string;
  onSelectSortOrder: (sortOrder: string) => void
}

const SortSelector = ({sortOrder, onSelectSortOrder}: Props) => {
  const sortOrders = [
    { label: "Relevance", value: "a" },
    { label: "Date Added", value: "-added" },
    { label: "Name", value: "name" },
    { label: "Release Date", value: "-released" },
    { label: "Popularity", value: "-metacritic" },
    { label: "Average Rating", value: "-rating" },
  ];

  const currentSortOrder = sortOrders.find(order => order.value === sortOrder)
  return (
    <Menu.Root positioning={{ placement: "bottom-start" }}>
      {/* Chakra UI v3 type definitions incorrectly omit children prop when
          using asChild. See: https://github.com/chakra-ui/chakra-ui/issues/10348 */}
      {/* @ts-expect-error */}
      <Menu.Trigger asChild>
        <Button>
          Sort by: {currentSortOrder?.label || "Relevance"}
          <BsChevronDown />
        </Button>
      </Menu.Trigger>
      {/* Chakra UI v3 type definitions incorrectly omit children prop.
          See: https://github.com/chakra-ui/chakra-ui/discussions/9306 */}
      {/* @ts-expect-error */}
      <Menu.Positioner>
        {/* @ts-expect-error */}
        <Menu.Content>
          {sortOrders.map((order) => (
            // @ts-expect-error - Chakra UI v3 type def bug
            <Menu.Item
              onClick={() => onSelectSortOrder(order.value)}
              key={order.value}
              value={order.value}
            >
              {order.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default SortSelector;
