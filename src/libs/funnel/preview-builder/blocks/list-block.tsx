import { getLightOrDarkColor } from "@/libs/utils";
import { ListBlock as ListBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ListBlock({ block, bgColor }: BlockComponentProps<ListBlockType>) {
  const color = getLightOrDarkColor(bgColor);
  const textColor = color === "dark" ? "text-white" : "text-primary-foreground";

  return (
    <ul className="grid grid-cols-1 @md:grid-cols-2 w-full @sm:max-w-xl @md:max-w-screen-md @lg:max-w-screen-lg @xl:max-w-screen-xl @2xl:max-w-screen-2xl mx-auto gap-4 @md:gap-6">
      {block.items.map((item) => (
        <li key={item.id} className={`flex items-center p-6 rounded-2xl ${textColor} gap-3 @md:gap-4`}>
          <div className="flex-none flex items-center justify-center rounded-xl h-12 w-12">
            <img src={item.src} alt={item.title} className="object-contain" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-base @md:text-lg font-semibold leading-tight">{item.title}</div>
            {item.description && (
              <div className="text-sm @md:text-base mt-2 @md:mt-3 leading-relaxed">{item.description}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
