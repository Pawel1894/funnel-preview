import { Page, previewViewportSizes, ViewMode } from "../funnel";
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
    <div className="flex-1 border border-muted rounded-lg overflow-hidden md:p-4 h-inherit">
      <div className="h-full overflow-auto">
        <motion.div
          animate={{
            width: currentViewport.width,
            minHeight: currentViewport.minHeight,
          }}
          transition={{
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="@container p-16 flex flex-col gap-14"
          style={{
            backgroundColor: bgColor,
          }}
        >
          {page.blocks.map((block, index) => (
            <motion.div 
              key={block.id} 
              {...createPageStaggeredAnimation(index)}
              className="flex w-full"
            >
              <BlockRenderer block={block} bgColor={bgColor} />
            </motion.div>
          ))}
        </motion.div>
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
