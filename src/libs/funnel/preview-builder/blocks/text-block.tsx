import { TextBlock as TextBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";
import { getLightOrDarkColor } from "@/libs/utils";

export function TextBlock({ block, bgColor, containerWidth }: BlockComponentProps<TextBlockType>) {
  const color = getLightOrDarkColor(bgColor);
  const textColor = color === "dark" ? "text-white" : "text-primary-foreground";
  // naively assume that if the text is less than 50 characters, it's a heading
  // should be based on the block.fontSize property instead
  const isHeading = block.text.length < 50;

  const fontSize = isHeading
    ? Math.max(24, Math.min(48, containerWidth * 0.08))
    : Math.max(16, Math.min(20, containerWidth * 0.04));

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto">
      <div
        className={textColor}
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: isHeading ? 700 : 400,
          lineHeight: isHeading ? 1.2 : 1.5,
          letterSpacing: isHeading ? "-0.02em" : "0",
          textAlign: block.align,
        }}
      >
        {block.text}
      </div>
    </div>
  );
}
