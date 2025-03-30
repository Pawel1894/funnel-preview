import { getLightOrDarkColor } from "@/libs/utils";
import { ListBlock as ListBlockType } from "../../funnel";
import { BlockComponentProps } from "../block-registry";

export function ListBlock({ block, bgColor, containerWidth }: BlockComponentProps<ListBlockType>) {
  const color = getLightOrDarkColor(bgColor);
  const textColor = color === "dark" ? "text-white" : "text-primary-foreground";
  const borderColor = color === "dark" ? "border-gray-100" : "border-gray-800/10";
  const itemBgColor = color === "dark" ? "bg-white" : "bg-white/5";

  const useGrid = containerWidth >= 768;
  const fontSize = Math.max(16, Math.min(20, containerWidth * 0.04));
  const gap = Math.max(16, Math.min(24, containerWidth * 0.03));

  return (
    <ul
      className="grid w-full max-w-md sm:max-w-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto"
      style={{
        display: "grid",
        gridTemplateColumns: useGrid ? "repeat(2, 1fr)" : "1fr",
        gap: `${gap}px`,
      }}
    >
      {block.items.map((item) => (
        <li
          key={item.id}
          className={`flex items-start p-6 rounded-2xl border ${borderColor} ${itemBgColor} ${textColor}`}
          style={{ gap: `${gap * 0.75}px` }}
        >
          <div className="flex-none flex items-center justify-center rounded-xl h-12 w-12">
            {item.src ? (
              <img src={item.src} alt={item.title} className="object-contain" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {item.title}
            </div>
            {item.description && (
              <div
                style={{
                  fontSize: `${fontSize * 0.875}px`,
                  marginTop: `${gap * 0.5}px`,
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
