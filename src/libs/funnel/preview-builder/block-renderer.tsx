import { Block } from "../funnel";
import { getBlockRenderer } from "./block-registry";

type BlockRendererProps = {
  block: Block;
};

export function BlockRenderer({ block }: BlockRendererProps) {
  const Component = getBlockRenderer(block.type);

  return <Component block={block} />;
}
