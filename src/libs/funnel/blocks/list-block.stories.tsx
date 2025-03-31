import type { Meta, StoryObj } from "@storybook/react";
import { ListBlock } from "./list-block";

const meta: Meta<typeof ListBlock> = {
  title: "Funnel/ListBlock",
  component: ListBlock,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListBlock>;

export default meta;

type Story = StoryObj<typeof ListBlock>;

export const Default: Story = {
  render: function Render() {
    return (
      <div>
        <div className="@container w-[500px] p-8 rounded-lg">
          <h3 className="mb-2 font-medium">Mobile 500px width viewport</h3>
          <ListBlock
            block={{
              id: "1",
              type: "list",
              items: [
                {
                  id: "1",
                  title: "Feature 1",
                  description: "Description for feature 1",
                  src: "https://picsum.photos/32/32",
                },
                {
                  id: "2",
                  title: "Feature 2",
                  description: "Description for feature 2",
                  src: "https://picsum.photos/32/32",
                },
              ],
            }}
            bgColor="#000"
          />
        </div>
        <div className="@container w-[1200px] p-8 rounded-lg">
          <h3 className="mb-2 font-medium">Desktop 1200px width viewport</h3>
          <ListBlock
            block={{
              id: "1",
              type: "list",
              items: [
                {
                  id: "1",
                  title: "Feature 1",
                  description: "Description for feature 1",
                  src: "https://picsum.photos/32/32",
                },
                {
                  id: "2",
                  title: "Feature 2",
                  description: "Description for feature 2",
                  src: "https://picsum.photos/32/32",
                },
              ],
            }}
            bgColor="#000"
          />
        </div>
      </div>
    );
  },
};
