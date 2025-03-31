import { Block } from "../domain/funnel";
import { BlockComponentProps, getBlockRenderer } from "./block-registry";

export function BlockRenderer<T extends Block>({ block, bgColor }: BlockComponentProps<T>) {
  const Component = getBlockRenderer(block.type);

  return <Component block={block} bgColor={bgColor} />;
}
