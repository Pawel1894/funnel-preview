import { ButtonBlock as ButtonBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ButtonBlock({ block }: BlockComponentProps<ButtonBlockType>) {
  return (
    <button
      type="button"
      className="block rounded-2xl cursor-pointer font-semibold shadow-lg hover:opacity-90 mx-auto transition-opacity w-fit text-base @md:text-lg px-6 @md:px-9 py-3 @md:py-4"
      style={{
        backgroundColor: block.bgColor,
        color: block.color,
      }}
    >
      {block.text}
    </button>
  );
}
