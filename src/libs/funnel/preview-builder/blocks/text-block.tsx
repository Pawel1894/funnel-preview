import { TextBlock as TextBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function TextBlock({ block }: BlockComponentProps<TextBlockType>) {
  return (
    <div
      className="w-full font-bold text-3xl @md:text-4xl @lg:text-5xl mx-auto @sm:max-w-xl @md:max-w-screen-md @lg:max-w-screen-lg @xl:max-w-screen-xl @2xl:max-w-screen-2xl"
      style={{
        textAlign: block.align,
        color: block.color,
      }}
    >
      {block.text}
    </div>
  );
}
