import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Button } from "../button/button";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div>
        <h3 className="mb-4 font-medium">Default Tooltip</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a tooltip
          </TooltipContent>
        </Tooltip>
      </div>

      <div>
        <h3 className="mb-4 font-medium">Different Positions</h3>
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Appears on top
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Appears at bottom
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              Appears on left
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Appears on right
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-medium">With Different Content</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>With Rich Content</Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p className="font-medium">Tooltip Title</p>
              <p className="text-xs text-muted-foreground">Additional description here</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}; 