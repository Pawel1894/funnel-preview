"use client";

import { useMemo, useState } from "react";
import { FunnelHeader } from "./funnel-header";
import { Funnel, Page } from "./funnel";
import { FunnelUploader } from "./funnel-uploader";
import { FunnelViewer } from "./funnel-viewer";

export function FunnelContainer() {
  const [funnel, setFunnel] = useState<Funnel>();

  const [currentPage, setCurrentPage] = useState<Page | undefined>(funnel?.pages[0]);

  const handlePageChange = (pageId: string) => {
    const page = funnel?.pages.find((page) => page.id === pageId);
    if (page) {
      setCurrentPage(page);
    }
  };

  const currentPageNumber = useMemo(() => {
    if (!funnel || !currentPage) {
      return 0;
    }

    const pageIndex = funnel.pages.findIndex((page) => page.id === currentPage.id);
    return pageIndex !== -1 ? pageIndex + 1 : 0;
  }, [funnel, currentPage]);

  const handleFunnelLoaded = (funnel: Funnel) => {
    setFunnel(funnel);
    setCurrentPage(funnel.pages[0]);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="shadow-md border-b-1 border-b-muted">
        <FunnelHeader
          classNames={`max-w-[1440px] mx-auto`}
          funnelTitle={funnel?.name}
          pagination={
            funnel && {
              current: currentPageNumber,
              total: funnel?.pages.length,
            }
          }
        />
      </div>
      <div
        className={`p-4 flex-1 flex justify-center h-full w-full max-w-[1440px] mx-auto`}
      >
        {!funnel ? (
          <FunnelUploader onFunnelLoaded={handleFunnelLoaded} />
        ) : (
          <FunnelViewer funnel={funnel} currentPage={currentPage} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}
