import type { Meta, StoryObj } from "@storybook/react";

import { FileUploadZone } from "./file-upload-zone";

const meta: Meta<typeof FileUploadZone> = {
  title: "UI/FileUploadZone",
  component: FileUploadZone,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FileUploadZone>;

export default meta;

type Story = StoryObj<typeof FileUploadZone>;

export const Default: Story = {
  args: {
    title: "Upload your file",
    description:
      "Drag and drop your file here, or click to select a file from your computer. We support PDF, DOCX, and other common file formats.",
  },
};
