import type { Meta, StoryObj } from "@storybook/react";
import { TextBlock } from "./text-block";

const meta: Meta<typeof TextBlock> = {
  title: "Funnel/TextBlock",
  component: TextBlock,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextBlock>;

export default meta;

type Story = StoryObj<typeof TextBlock>;

export const Default: Story = {
  render: function Render() {
    return (
      <div>
        <div className="w-[500px] p-8 bg-background rounded-lg">
          <h3 className="mb-2 font-medium">Mobile 500px width viewport</h3>
          <TextBlock
            block={{
              id: "1",
              type: "text",
              text: "Sample text",
              color: "#fff",
              align: "left",
            }}
            bgColor="#ffffff"
            viewportWidth={500}
          />
        </div>
        <div className="w-[1200px] p-8 bg-background rounded-lg">
          <h3 className="mb-2 font-medium">Desktop 1200px width viewport</h3>
          <TextBlock
            block={{
              id: "1",
              type: "text",
              text: "Sample text",
              color: "#fff",
              align: "left",
            }}
            bgColor="#ffffff"
            viewportWidth={1200}
          />
        </div>
      </div>
    );
  },
};
