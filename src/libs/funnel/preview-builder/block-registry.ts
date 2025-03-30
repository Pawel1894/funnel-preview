import { Block } from "../funnel";
import { TextBlock as TextBlockComponent } from "./blocks/text-block";
import { ImageBlock as ImageBlockComponent } from "./blocks/image-block";
import { ListBlock as ListBlockComponent } from "./blocks/list-block";
import { ButtonBlock as ButtonBlockComponent } from "./blocks/button-block";

export type BlockComponentProps<T extends Block> = {
  block: T;
  bgColor: string;
};

type BlockRegistry = {
  [K in Block["type"]]: React.ComponentType<BlockComponentProps<Extract<Block, { type: K }>>>;
};

const registry: BlockRegistry = {
  text: TextBlockComponent,
  image: ImageBlockComponent,
  list: ListBlockComponent,
  button: ButtonBlockComponent,
};

export function getBlockRenderer<T extends Block["type"]>(
  blockType: T
): React.ComponentType<{ block: Extract<Block, { type: T }>; bgColor: string }> {
  return registry[blockType];
}
