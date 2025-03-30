import { ButtonBlock as ButtonBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ButtonBlock({ block }: BlockComponentProps<ButtonBlockType>) {
  return (
    <div className="w-full flex justify-center">
      <button
        className="px-8 py-4 text-base font-semibold rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm hover:shadow-md w-full max-w-sm"
        style={{
          backgroundColor: block.bgColor,
          color: block.color,
        }}
      >
        {block.text}
      </button>
    </div>
  );
}
