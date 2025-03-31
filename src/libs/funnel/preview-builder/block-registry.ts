import { Block } from "../funnel";
import { TextBlock } from "./blocks/text-block";
import { ImageBlock } from "./blocks/image-block";
import { ListBlock } from "./blocks/list-block";
import { ButtonBlock } from "./blocks/button-block";

export type BlockComponentProps<T extends Block> = {
  block: T;
  bgColor: string;
};

type BlockRegistry = {
  [K in Block["type"]]: React.ComponentType<BlockComponentProps<Extract<Block, { type: K }>>>;
};

const registry: BlockRegistry = {
  text: TextBlock,
  image: ImageBlock,
  list: ListBlock,
  button: ButtonBlock,
};

export function getBlockRenderer<T extends Block["type"]>(
  blockType: T
): React.ComponentType<BlockComponentProps<Extract<Block, { type: T }>>> {
  return registry[blockType];
}
