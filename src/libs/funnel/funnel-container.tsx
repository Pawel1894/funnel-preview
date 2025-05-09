"use client";

import { useState } from "react";
import { FunnelHeader } from "./funnel-header";
import { Funnel } from "./domain/funnel";
import { FunnelUploader } from "./funnel-uploader";
import { FunnelViewer } from "./funnel-viewer";
import { useFunnelPages } from "./hooks/use-funnel-pages";

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
    <div className="flex flex-col h-full min-h-inherit">
      <div className="shadow-md border-b-1 border-b-muted">
        <FunnelHeader
          className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl"
          funnelTitle={funnel?.name}
          pagination={
            funnel && {
              current: currentPageNumber,
              total: totalPages,
            }
          }
        />
      </div>
      <div className="flex-1 p-4 flex justify-center overflow-hidden mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl">
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
