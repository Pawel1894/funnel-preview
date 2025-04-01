import { TextBlock as TextBlockType } from "../domain/funnel";
import { BlockComponentProps } from "../renderer/block-registry";

export function TextBlock({ block }: BlockComponentProps<TextBlockType>) {
  return (
    <div
      className="w-full font-bold text-3xl @md:text-4xl @lg:text-5xl mx-auto @sm:max-w-xl @md:max-w-screen-md @lg:max-w-screen-lg @xl:max-w-screen-xl @2xl:max-w-screen-2xl line-clamp-3"
      style={{
        textAlign: block.align,
        color: block.color,
      }}
      title={block.text}
    >
      {block.text}
    </div>
  );
}
