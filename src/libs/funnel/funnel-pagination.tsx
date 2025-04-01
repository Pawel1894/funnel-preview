import { Button, ChevronLeftIcon, ChevronRightIcon } from "@/libs/ui";
import { Page } from "./domain/funnel";

export function FunnelPagination({
  pages,
  currentPage,
  onPageChange,
}: {
  pages: Page[];
  currentPage?: Page;
  onPageChange: (pageId: string) => void;
}) {
  const noPages = pages.length <= 1;

  const currentIndex = pages.findIndex((p) => p.id === currentPage?.id);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onPageChange(pages[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      onPageChange(pages[currentIndex + 1].id);
    }
  };

  const disabledPrevious = noPages ? true : currentIndex === 0;
  const disabledNext = noPages ? true : currentIndex === pages.length - 1;

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePrevious} disabled={disabledPrevious} className="p-2">
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button onClick={handleNext} disabled={disabledNext} className="p-2">
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
