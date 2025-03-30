import { TextBlock as TextBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function TextBlock({ block }: BlockComponentProps<TextBlockType>) {
  return (
    <div
      className="w-full text-2xl md:text-6xl font-bold tracking-tight leading-relaxed md:leading-relaxed"
      style={{
        color: block.color,
        textAlign: block.align,
      }}
    >
      {block.text}
    </div>
  );
}
