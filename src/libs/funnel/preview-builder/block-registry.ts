import { Block } from "../funnel";
import { ButtonBlock } from "./blocks/button-block";
import { ImageBlock } from "./blocks/image-block";
import { ListBlock } from "./blocks/list-block";
import { TextBlock } from "./blocks/text-block";

export type BlockComponentProps<T extends Block> = {
  block: T;
  bgColor: string;
  containerWidth: number;
};

const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  list: ListBlock,
  button: ButtonBlock,
} as const;

export function getBlockRenderer<T extends Block["type"]>(type: T) {
  return blockComponents[type] as React.ComponentType<BlockComponentProps<Extract<Block, { type: T }>>>;
}
