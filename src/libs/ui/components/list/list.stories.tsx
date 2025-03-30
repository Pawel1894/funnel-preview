import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "./list";
import { useState } from "react";

const meta: Meta<typeof List> = {
  title: "UI/List",
  component: List,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof List>;

export default meta;

function ListDemo() {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 font-medium">Default</h3>
        <div className="w-[300px] overflow-auto border border-muted rounded-md">
          <List selectedItem={selectedItem} onSelect={setSelectedItem}>
            <ListItem id="1">First Item</ListItem>
            <ListItem id="2">Second Item</ListItem>
            <ListItem id="3">Third Item</ListItem>
          </List>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Ordered</h3>
        <div className="w-[300px] overflow-auto border border-muted rounded-md">
          <List ordered selectedItem={selectedItem} onSelect={setSelectedItem}>
            <ListItem id="1">First Item</ListItem>
            <ListItem id="2">Second Item</ListItem>
            <ListItem id="3">Third Item</ListItem>
          </List>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Scrollable</h3>
        <div className="h-[250px] w-[300px] overflow-auto border border-muted rounded-md">
          <List selectedItem={selectedItem} onSelect={setSelectedItem}>
            {Array.from({ length: 20 }, (_, i) => (
              <ListItem key={i + 1} id={String(i + 1)}>
                Item {i + 1}
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export const Default: StoryObj<typeof List> = {
  render: () => <ListDemo />,
};
