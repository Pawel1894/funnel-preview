import { Page } from "../funnel";
import { BlockRenderer } from "./block-renderer";

type PageRendererProps = {
  page?: Page;
};

export function PageRenderer({ page }: PageRendererProps) {
  if (!page || !page.blocks || page.blocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px] w-full bg-background border border-muted rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">No content</p>
          <p className="text-sm text-muted-foreground">This page is empty. Add some blocks to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border border-muted rounded-md h-full overflow-auto flex-col">
      {page.blocks.map((block, index) => {
        return <BlockRenderer key={index} block={block} />;
      })}
    </div>
  );
}
