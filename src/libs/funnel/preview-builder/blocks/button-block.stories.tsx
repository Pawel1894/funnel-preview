import type { Meta, StoryObj } from "@storybook/react";
import { ButtonBlock } from "./button-block";

const meta: Meta<typeof ButtonBlock> = {
  title: "Funnel/ButtonBlock",
  component: ButtonBlock,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonBlock>;

export default meta;

type Story = StoryObj<typeof ButtonBlock>;

export const Default: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-8 items-center">
        <h3 className="mb-2 font-medium">Mobile 500px width viewport</h3>
        <ButtonBlock
          block={{
            id: "1",
            type: "button",
            text: "Click me",
            color: "white",
            bgColor: "#0076FF",
          }}
          bgColor="#ffffff"
          viewportWidth={500}
        />
        <h3 className="mb-2 font-medium">Desktop 1200px width viewport</h3>
        <ButtonBlock
          block={{
            id: "1",
            type: "button",
            text: "Click me",
            color: "white",
            bgColor: "#0076FF",
          }}
          bgColor="#ffffff"
          viewportWidth={1200}
        />
      </div>
    );
  },
};
