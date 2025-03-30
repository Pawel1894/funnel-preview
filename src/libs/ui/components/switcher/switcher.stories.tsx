import type { Meta, StoryObj } from "@storybook/react";
import { Switcher } from "./switcher";
import { UploadIcon } from "../../icons/upload-icon";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof Switcher> = {
  title: "UI/Switcher",
  component: Switcher,
  render: function Render() {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: string) => {
      updateArgs({ value: newValue });
    };

    return (
      <div className="flex flex-col gap-4 w-min">
        <span>with icons</span>
        <div className="w-min">
          <Switcher
            options={[
              {
                icon: <UploadIcon />,
                id: "upload",
                label: "Upload",
              },
              {
                icon: <UploadIcon />,
                id: "download",
                label: "Download",
              },
            ]}
            value={value}
            onChange={handleChange}
          />
        </div>
        <span>without icons</span>
        <div className="w-min">
          <Switcher
            options={[
              {
                id: "upload",
                label: "Upload",
              },
              {
                id: "download",
                label: "Download",
              },
            ]}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Switcher>;

export const Default: Story = {
  args: {
    value: "upload",
  },
};
