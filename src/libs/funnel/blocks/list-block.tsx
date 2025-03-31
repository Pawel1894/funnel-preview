import { getLightOrDarkColor } from "@/libs/utils";
import { ListBlock as ListBlockType } from "../domain/funnel";
import { BlockComponentProps } from "../renderer/block-registry";

export function ListBlock({ block, bgColor }: BlockComponentProps<ListBlockType>) {
  const color = getLightOrDarkColor(bgColor);
  const textColor = color === "dark" ? "text-white" : "text-primary-foreground";

  return (
    <ul className="grid grid-cols-1 @md:grid-cols-2 gap-8 @md:gap-12">
      {block.items.map((item) => (
        <li key={item.id} className={`flex flex-col items-center text-center ${textColor}`}>
          <div className="mb-4">
            {item.src && <img src={item.src} alt={item.title} className="w-12 h-12 @md:w-16 @md:h-16 object-contain" />}
          </div>
          <h3 className="text-xl @md:text-2xl font-semibold mb-2">{item.title}</h3>
          {item.description && <p className="leading-relaxed">{item.description}</p>}
        </li>
      ))}
    </ul>
  );
}
