import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    selectedText: "Choose a color",
    children: (
      <>
        <div className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          Red
        </div>
        <div className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          Blue
        </div>
        <div className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          Green
        </div>
      </>
    ),
  },
};
