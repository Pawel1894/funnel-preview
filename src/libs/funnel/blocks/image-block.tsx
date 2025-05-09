import { ImageBlock as ImageBlockType } from "../domain/funnel";
import { BlockComponentProps } from "../renderer/block-registry";

export function ImageBlock({ block }: BlockComponentProps<ImageBlockType>) {
  return (
    <div className="overflow-hidden w-full @sm:max-w-xl @md:max-w-screen-md @lg:max-w-screen-lg @xl:max-w-screen-xl @2xl:max-w-screen-2xl mx-auto">
      <img src={block.src} alt={block.alt || ""} className="mx-auto rounded-2xl" />
    </div>
  );
}
