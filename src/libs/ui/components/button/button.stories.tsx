import type { Meta, StoryObj } from "@storybook/react";

import { Button, type ButtonProps } from "./button";

const variants: ButtonProps["variant"][] = ["primary", "outline"];
const sizes: ButtonProps["size"][] = ["sm", "md", "lg"];

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      options: [],
    },
    size: {
      options: [],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default: StoryObj<typeof Button> = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="space-y-2">
          <h3 className="text-sm font-medium capitalize">{variant}</h3>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size} {...args}>
                {`${variant} ${size}`}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <Button key={`${variant}-${size}-disabled`} variant={variant} size={size} disabled {...args}>
                {`disabled ${variant} ${size}`}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
