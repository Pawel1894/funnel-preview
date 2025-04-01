import { Page, previewViewportSizes, ViewMode } from "../domain/funnel";
import { BlockRenderer } from "./block-renderer";
import { motion, Variants } from "framer-motion";

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
    <div
      data-testid="funnel-container"
      className="relative flex-1 overflow-auto"
      style={{
        width: currentViewport.width,
        height: currentViewport.height,
      }}
    >
      <div
        data-testid="funnel-content"
        className="@container p-16 mx-auto space-y-24 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: bgColor,
          width: currentViewport.width,
          minHeight: currentViewport.height,
        }}
      >
        {page.blocks.map((block, index) => (
          <motion.div className="mx-auto w-full" key={block.id} {...createPageStaggeredAnimation(index)}>
            <BlockRenderer block={block} bgColor={bgColor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function createPageStaggeredAnimation(
  blockIndex: number,
  maxDelay: number = 0.5,
  staggerDelay: number = 0.1
): Variants {
  const delay = Math.min(blockIndex * staggerDelay, maxDelay);

  return {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };
}
