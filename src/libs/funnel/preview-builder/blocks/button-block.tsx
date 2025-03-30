import { ButtonBlock as ButtonBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";
import { getLightOrDarkColor } from "@/libs/utils";

export function ButtonBlock({ block, bgColor, containerWidth }: BlockComponentProps<ButtonBlockType>) {
  const color = getLightOrDarkColor(bgColor);
  const buttonBgColor = color === "dark" ? "bg-primary" : "bg-white";
  const buttonTextColor = color === "dark" ? "text-white" : "text-gray-900";

  const fontSize = Math.max(16, Math.min(20, containerWidth * 0.04));
  const padding = Math.max(16, Math.min(24, containerWidth * 0.03));

  return (
    <button
      type="button"
      className={`${buttonBgColor} ${buttonTextColor} rounded-full shadow-lg hover:opacity-90 transition-opacity w-fit mx-auto`}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: 600,
        padding: `${padding * 0.75}px ${padding * 1.5}px`,
        backgroundColor: block.bgColor,
        color: block.color,
      }}
    >
      {block.text}
    </button>
  );
}
