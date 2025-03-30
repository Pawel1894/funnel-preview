import { ImageBlock as ImageBlockType } from "../../funnel";

type ImageBlockProps = {
  block: ImageBlockType;
};

export function ImageBlock({ block }: ImageBlockProps) {
  return (
    <img 
      src={block.src}
      alt={block.alt}
      style={{
        maxWidth: '100%'
      }}
    />
  );
}
