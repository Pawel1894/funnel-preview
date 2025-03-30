import { useMemo, useState, useEffect } from "react";
import { Page } from "./funnel";

export function useFunnelPages(pages?: Page[]) {
  const [currentPage, setCurrentPage] = useState<Page | undefined>();

  useEffect(() => {
    if (!currentPage || !pages?.find((page) => page.id === currentPage.id)) {
      setCurrentPage(pages?.[0]);
    }
  }, [pages, currentPage]);

  const handlePageChange = (pageId: string) => {
    const page = pages?.find((page) => page.id === pageId);
    if (page) {
      setCurrentPage(page);
    }
  };

  const currentPageNumber = useMemo(() => {
    if (!currentPage || !pages || pages?.length === 0) {
      return 0;
    }

    const pageIndex = pages.findIndex((page) => page.id === currentPage.id);
    return pageIndex !== -1 ? pageIndex + 1 : 0;
  }, [pages, currentPage]);

  return {
    currentPage,
    currentPageNumber,
    totalPages: pages?.length ?? 0,
    handlePageChange,
  };
}
