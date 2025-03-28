import type { Meta, StoryObj } from "@storybook/react";

import { FileUpload } from "./file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    title: "Upload your file",
    description:
      "Drag and drop your file here, or click to select a file from your computer. We support PDF, DOCX, and other common file formats.",
  },
};
