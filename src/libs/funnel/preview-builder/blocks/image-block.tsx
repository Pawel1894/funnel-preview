import { ImageBlock as ImageBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ImageBlock({ block }: BlockComponentProps<ImageBlockType>) {
  return (
    <div className="w-full">
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={block.src}
          alt={block.alt}
          className="w-full h-auto object-cover opacity-0 transition-opacity duration-300"
          onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
          loading="lazy"
        />
      </div>
    </div>
  );
}
