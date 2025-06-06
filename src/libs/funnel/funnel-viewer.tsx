"use client";

import { useState, useRef } from "react";
import { Funnel, Page, ViewMode } from "./domain/funnel";
import { FunnelSidebar } from "./funnel-sidebar";
import { PageRenderer } from "./renderer/page-renderer";
import { FunnelPagination } from "./funnel-pagination";
import { PageSelectionDropdown } from "./page-selection-dropdown";
import { FunnelSelectionDropdown } from "./funnel-selection-dropdown";
import { DeviceViewSwitcher } from "./device-view-switcher";
import { FunnelError } from "./funnel-error";

type FunnelViewerProps = {
  funnel: Funnel;
  currentPage?: Page;
  onPageChange: (pageId: string) => void;
  onFunnelClear?: () => void;
  onFunnelUpload?: (funnel: Funnel) => void;
};

export function FunnelViewer({
  funnel,
  currentPage,
  onPageChange,
  onFunnelClear,
  onFunnelUpload,
}: FunnelViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("mobile");
  const [error, setError] = useState<{ message: string; issues: string[] } | null>(null);
  const pagePreviewRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    if (pagePreviewRef.current?.scrollTo) {
      pagePreviewRef.current.scrollTo({ top: 0 });
    }
  };

  const handleFunnelUpload = (funnel: Funnel) => {
    onFunnelUpload?.(funnel);
    if (pagePreviewRef.current?.scrollTo) {
      pagePreviewRef.current.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="flex flex-col w-full h-inherit">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="md:hidden flex items-center justify-between">
          <PageSelectionDropdown
            pages={funnel.pages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <FunnelPagination pages={funnel.pages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <FunnelSelectionDropdown
              onClear={onFunnelClear}
              onFunnelLoaded={handleFunnelUpload}
              onError={setError}
            />
            <DeviceViewSwitcher viewMode={viewMode} onChange={setViewMode} />
          </div>
          {error && <FunnelError error={error} onClose={() => setError(null)} />}
        </div>
      </div>

      <div className="flex gap-4 w-full flex-1 min-h-0 mt-4">
        <div className="hidden md:block min-w-[250px] max-w-[350px] w-1/4">
          <FunnelSidebar onPageSelection={handlePageChange} pages={funnel.pages} currentPage={currentPage} />
        </div>

        <PageRenderer ref={pagePreviewRef} viewMode={viewMode} bgColor={funnel.bgColor} page={currentPage} />
      </div>
    </div>
  );
}
