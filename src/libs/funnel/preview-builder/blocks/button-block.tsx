import { ButtonBlock as ButtonBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ButtonBlock({ block, viewportWidth }: BlockComponentProps<ButtonBlockType>) {
  const fontSize = Math.max(16, Math.min(20, viewportWidth * 0.04));
  const padding = Math.max(16, Math.min(24, viewportWidth * 0.03));

  return (
    <button
      type="button"
      className="rounded-full shadow-lg hover:opacity-90 transition-opacity w-fit mx-auto"
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
