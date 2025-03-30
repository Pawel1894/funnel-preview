import { Page } from "../funnel";
import { BlockRenderer } from "./block-renderer";

type PageRendererProps = {
  page: Page;
};

export function PageRenderer({ page }: PageRendererProps) {
  if (!page.blocks || page.blocks.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border border-muted rounded-md h-full overflow-auto flex-col">
      {page.blocks.map((block, index) => {
        return <BlockRenderer key={index} block={block} />;
      })}
    </div>
  );
}
