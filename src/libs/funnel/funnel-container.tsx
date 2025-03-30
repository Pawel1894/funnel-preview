"use client";

import { useState } from "react";
import { FunnelHeader } from "./funnel-header";
import { Funnel } from "./funnel";
import { FunnelUploader } from "./funnel-uploader";
import { FunnelViewer } from "./funnel-viewer";
import { useFunnelPages } from "./use-funnel-pages";

export function FunnelContainer() {
  const [funnel, setFunnel] = useState<Funnel>();
  const { currentPage, currentPageNumber, totalPages, handlePageChange, setCurrentPage } = useFunnelPages(
    funnel?.pages
  );

  const handleFunnelLoaded = (loadedFunnel: Funnel) => {
    setFunnel(loadedFunnel);
    setCurrentPage(loadedFunnel.pages[0]);
  };

  const handleFunnelClear = () => {
    setFunnel(undefined);
    setCurrentPage(undefined);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="shadow-md border-b-1 border-b-muted">
        <FunnelHeader
          classNames="max-w-[1440px] mx-auto"
          funnelTitle={funnel?.name}
          pagination={
            funnel && {
              current: currentPageNumber,
              total: totalPages,
            }
          }
        />
      </div>
      <div className="p-4 flex-1 flex justify-center h-full w-full max-w-[1440px] mx-auto">
        {!funnel ? (
          <FunnelUploader onFunnelLoaded={handleFunnelLoaded} />
        ) : (
          <FunnelViewer
            funnel={funnel}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onFunnelClear={handleFunnelClear}
            onFunnelUpload={handleFunnelLoaded}
          />
        )}
      </div>
    </div>
  );
}
