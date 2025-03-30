import { TextBlock as TextBlockType } from "../../funnel";

type TextBlockProps = {
  block: TextBlockType;
};

export function TextBlock({ block }: TextBlockProps) {
  return (
    <div 
      style={{ 
        color: block.color,
        textAlign: block.align,
      }}
    >
      {block.text}
    </div>
  );
}
