import { z } from "zod";

const TextBlockSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  text: z.string().min(1, "Required"),
  color: z.string().default("#202020"),
  align: z.enum(["left", "center", "right"]).default("left"),
});

const ImageBlockSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  src: z.string().min(1, "Required"),
  alt: z.string().default("Image"),
});

const ListItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  src: z.string().optional(),
});

const ListBlockSchema = z.object({
  id: z.string(),
  type: z.literal("list"),
  items: z.array(ListItemSchema)
    .default([])
    .refine(
      (items) => {
        const itemsIds = items.map((item) => item.id);
        return new Set(itemsIds).size === itemsIds.length;
      },
      {
        message: "All items within a list must have unique IDs",
      }
    ),
});

const ButtonBlockSchema = z.object({
  id: z.string(),
  type: z.literal("button"),
  text: z.string().default("Click me"),
  color: z.string().default("white"),
  bgColor: z.string().default("#0076FF"),
});

const BlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  ImageBlockSchema,
  ListBlockSchema,
  ButtonBlockSchema,
]);

export const PageSchema = z.object({
  id: z.string(),
  blocks: z.array(BlockSchema).default([]),
}).refine(
  (page) => {
    const blockIds = page.blocks.map((block) => block.id);
    return new Set(blockIds).size === blockIds.length;
  },
  {
    message: "All blocks within a page must have unique IDs",
    path: ["blocks"],
  }
);

export const FunnelSchema = z.object({
  name: z.string(),
  bgColor: z.string().default("#F5F5F5"),
  pages: z.array(PageSchema).default([]),
}).refine(
  (funnel) => {
    const pageIds = funnel.pages.map((page) => page.id);
    return new Set(pageIds).size === pageIds.length;
  },
  {
    message: "All pages must have unique IDs",
    path: ["pages"],
  }
);

export type TextBlock = z.infer<typeof TextBlockSchema>;
export type ImageBlock = z.infer<typeof ImageBlockSchema>;
export type ListItem = z.infer<typeof ListItemSchema>;
export type ListBlock = z.infer<typeof ListBlockSchema>;
export type ButtonBlock = z.infer<typeof ButtonBlockSchema>;
export type Block = z.infer<typeof BlockSchema>;
export type Page = z.infer<typeof PageSchema>;
export type Funnel = z.infer<typeof FunnelSchema>;
  
export type ViewMode = "desktop" | "mobile";

export function isViewMode(value: string): value is ViewMode {
  return value === "desktop" || value === "mobile";
}

export const previewViewportSizes: Record<ViewMode, { width: number; height: number }> = {
  mobile: {
    width: 375,
    height: 600,
  },
  desktop: {
    width: 1280,
    height: 720,
  },
};
