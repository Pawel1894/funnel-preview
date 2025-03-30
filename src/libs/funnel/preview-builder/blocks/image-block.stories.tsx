import type { Meta, StoryObj } from "@storybook/react";
import { ImageBlock } from "./image-block";

const meta: Meta<typeof ImageBlock> = {
  title: "Funnel/ImageBlock",
  component: ImageBlock,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageBlock>;

export default meta;

type Story = StoryObj<typeof ImageBlock>;

export const Default: Story = {
  render: function Render() {
    return (
      <div>
        <div className="w-[500px] p-8 bg-background rounded-lg">
          <h3 className="mb-2 font-medium">Mobile 500px width viewport</h3>
          <ImageBlock
            block={{
              id: "1",
              type: "image",
              src: "https://picsum.photos/800/600",
              alt: "Sample image",
            }}
            bgColor="#ffffff"
            viewportWidth={500}
          />
        </div>
        <div className="w-[1200px] p-8 bg-background rounded-lg">
          <h3 className="mb-2 font-medium">Desktop 1200px width viewport</h3>
          <ImageBlock
            block={{
              id: "1",
              type: "image",
              src: "https://picsum.photos/800/600",
              alt: "Sample image",
            }}
            bgColor="#ffffff"
            viewportWidth={1200}
          />
        </div>
      </div>
    );
  },
};
