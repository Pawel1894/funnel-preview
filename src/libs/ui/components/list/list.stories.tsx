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
    <div>
      <List>
        <List.Item id="1">First Item</List.Item>
        <List.Item id="2">Second Item</List.Item>
        <List.Item id="3">Third Item</List.Item>
      </List>
    </div>
  ),
};

export const Ordered: StoryObj<typeof List> = {
  render: () => (
    <div>
      <List ordered>
        <List.Item id="1">First Item</List.Item>
        <List.Item id="2">Second Item</List.Item>
        <List.Item id="3">Third Item</List.Item>
      </List>
    </div>
  ),
};

export const ScrollableList: StoryObj<typeof List> = {
  render: () => (
    <div className="h-[250px] w-[300px] overflow-auto border border-muted rounded-md">
      <List>
        {Array.from({ length: 20 }, (_, i) => (
          <List.Item key={i + 1} id={String(i + 1)}>
            Item {i + 1}
          </List.Item>
        ))}
      </List>
    </div>
  ),
};
