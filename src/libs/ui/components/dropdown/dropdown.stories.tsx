import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Dropdown, DropdownContent } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  component: Dropdown,
  render: function Render() {
    const [{ selectedText, closeOnSelect, variant }, updateArgs] = useArgs();

    const handleSelect = (color: string) => {
      updateArgs({ selectedText: color });
    };

    return (
      <div className="flex flex-col gap-8 w-[250px]">
        <div>
          <h3 className="mb-2 font-medium">
            {variant} {closeOnSelect ? "(closes on select)" : "(stays open on select)"}
          </h3>
          <Dropdown 
            selectedText={selectedText || "Choose a color"} 
            closeOnSelect={closeOnSelect}
            variant={variant}
          >
            <DropdownContent>
              <div
                className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                onClick={() => handleSelect("Red")}
              >
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                Red
              </div>
              <div
                className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                onClick={() => handleSelect("Blue")}
              >
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                Blue
              </div>
              <div
                className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                onClick={() => handleSelect("Green")}
              >
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                Green
              </div>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    selectedText: "Choose a color",
    closeOnSelect: true,
    variant: "primary",
  },
};

export const Outline: Story = {
  args: {
    selectedText: "Choose a color",
    closeOnSelect: true,
    variant: "outline",
  },
};

export const StayOpen: Story = {
  args: {
    selectedText: "Choose a color",
    closeOnSelect: false,
    variant: "primary",
  },
};
