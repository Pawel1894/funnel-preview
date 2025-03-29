import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./list";

const meta: Meta<typeof List> = {
  title: "UI/List",
  component: List,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof List>;

export default meta;

export const Default: StoryObj<typeof List> = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 font-medium">Default</h3>
        <div className="w-[300px] overflow-auto border border-muted rounded-md">
          <List>
            <List.Item id="1">First Item</List.Item>
            <List.Item id="2">Second Item</List.Item>
            <List.Item id="3">Third Item</List.Item>
          </List>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Ordered</h3>
        <div className="w-[300px] overflow-auto border border-muted rounded-md">
          <List ordered>
            <List.Item id="1">First Item</List.Item>
            <List.Item id="2">Second Item</List.Item>
            <List.Item id="3">Third Item</List.Item>
          </List>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Scrollable</h3>
        <div className="h-[250px] w-[300px] overflow-auto border border-muted rounded-md">
          <List>
            {Array.from({ length: 20 }, (_, i) => (
              <List.Item key={i + 1} id={String(i + 1)}>
                Item {i + 1}
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  ),
};
