import { Block } from "../funnel";
import { BlockComponentProps, getBlockRenderer } from "./block-registry";

export function BlockRenderer<T extends Block>({ block, bgColor, viewportWidth }: BlockComponentProps<T>) {
  const Component = getBlockRenderer(block.type);

  return <Component block={block} bgColor={bgColor} viewportWidth={viewportWidth} />;
}
