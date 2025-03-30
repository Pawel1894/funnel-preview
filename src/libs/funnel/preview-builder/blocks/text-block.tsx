import { TextBlock as TextBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function TextBlock({ block, viewportWidth }: BlockComponentProps<TextBlockType>) {
  // naively assume that if the text is less than 50 characters, it's a heading
  // should be based on the block.fontSize property instead
  const isHeading = block.text.length < 50;

  const fontSize = isHeading
    ? Math.max(24, Math.min(48, viewportWidth * 0.08))
    : Math.max(16, Math.min(20, viewportWidth * 0.04));

  return (
    <div
      className="w-full max-w-md sm:max-w-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto"
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: isHeading ? 700 : 400,
        textAlign: block.align,
        color: block.color,
      }}
    >
      {block.text}
    </div>
  );
}
