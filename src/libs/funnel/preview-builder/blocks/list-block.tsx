import { getLightOrDarkColor } from "@/libs/utils";
import { ListBlock as ListBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ListBlock({ block, bgColor }: BlockComponentProps<ListBlockType>) {
  const color = getLightOrDarkColor(bgColor);
  const textColor = color === "dark" ? "text-white" : "text-primary-foreground";
  const borderColor = color === "dark" ? "border-gray-100" : "border-gray-800/10";

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {block.items.map((item) => (
        <li key={item.id} className={`flex items-start gap-5 p-6 rounded-2xl border ${borderColor}`}>
          {item.src && (
            <div className="flex-none w-14 h-14 rounded-xl flex items-center justify-center">
              <img src={item.src} alt={item.title} className="w-8 h-8 object-contain" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className={`text-lg font-semibold tracking-tight ${textColor}`}>{item.title}</div>
            {item.description && (
              <div className={`mt-2 text-base leading-relaxed ${textColor}`}>{item.description}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
