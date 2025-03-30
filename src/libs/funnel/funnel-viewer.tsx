"use client";

import { Funnel, Page } from "./funnel";
import { FunnelSidebar } from "./funnel-sidebar";
import { PageRenderer } from "./preview-builder/page-renderer";

interface FunnelViewerProps {
  funnel: Funnel;
  currentPage?: Page;
  onPageChange: (pageId: string) => void;
}

export function FunnelViewer({ funnel, currentPage, onPageChange }: FunnelViewerProps) {
  return (
    <div className="flex gap-4 w-full h-auto">
      <div className="hidden md:block min-w-[250px] w-1/4">
        <FunnelSidebar onPageSelection={onPageChange} pages={funnel.pages} />
      </div>

      {currentPage && <PageRenderer page={currentPage} />}
    </div>
  );
}
