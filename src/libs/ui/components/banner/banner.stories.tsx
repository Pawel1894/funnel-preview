import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./banner";

const meta: Meta<typeof Banner> = {
  title: "UI/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["error", "warning", "success", "info"],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[500px]">
      <Banner variant="error" title="Error Banner">
        This is an error message with important information.
      </Banner>
    </div>
  ),
};
