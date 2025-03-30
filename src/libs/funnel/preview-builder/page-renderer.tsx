import { Page, previewViewportSizes, ViewMode } from "../funnel";
import { BlockRenderer } from "./block-renderer";

type PageRendererProps = {
  page?: Page;
  viewMode?: ViewMode;
  bgColor: string;
};

export function PageRenderer({ page, bgColor, viewMode = "mobile" }: PageRendererProps) {
  const currentViewport = previewViewportSizes[viewMode];

  if (!page || !page.blocks || page.blocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center border border-muted rounded-lg bg-background">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">No content</p>
          <p className="text-sm text-muted-foreground">This page is empty. Add some blocks to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 border border-muted rounded-lg overflow-hidden md:p-4 h-inherit">
      <div className="h-full overflow-auto">
        <div
          className="p-16 mx-auto flex flex-col gap-14"
          style={{
            width: `${currentViewport.width}px`,
            minHeight: `${currentViewport.minHeight}px`,
            backgroundColor: bgColor,
          }}
        >
          {page.blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              bgColor={bgColor}
              viewportWidth={currentViewport.width}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
