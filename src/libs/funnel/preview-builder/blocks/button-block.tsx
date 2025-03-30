import { ButtonBlock as ButtonBlockType } from "../../funnel";

type ButtonBlockProps = {
  block: ButtonBlockType;
};

export function ButtonBlock({ block }: ButtonBlockProps) {
  return (
    <button
      style={{
        backgroundColor: block.bgColor,
        color: block.color,
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {block.text}
    </button>
  );
}
