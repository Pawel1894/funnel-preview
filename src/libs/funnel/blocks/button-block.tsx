import { ButtonBlock as ButtonBlockType } from "../domain/funnel";
import { BlockComponentProps } from "../renderer/block-registry";

export function ButtonBlock({ block }: BlockComponentProps<ButtonBlockType>) {
  return (
    <button
      type="button"
      className="block rounded-2xl cursor-pointer font-semibold shadow-lg hover:opacity-90 mx-auto transition-opacity w-fit text-base @md:text-lg px-6 @md:px-9 py-3 @md:py-4 max-w-[100cqw] @md:max-w-md text-wrap break-words"
      style={{
        backgroundColor: block.bgColor,
        color: block.color,
      }}
      title={block.text}
    >
      {block.text}
    </button>
  );
}
