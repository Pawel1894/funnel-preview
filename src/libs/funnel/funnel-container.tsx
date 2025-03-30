"use client";

import { useMemo, useState } from "react";
import { FileUploadZone } from "@/libs/ui";

import { FunnelHeader } from "./funnel-header";
import { FunnelSidebar } from "./funnel-sidebar";
import { parseFunnelJson } from "./parser/funnel-parser";
import { FunnelError } from "./funnel-error";
import { Funnel, Page } from "./funnel";
import { PageRenderer } from "./preview-builder/page-renderer";

const MAX_CONTAINER_WIDTH_PX = 1440;

export function FunnelContainer() {
  const [funnel, setFunnel] = useState<Funnel>();
  const [uploadError, setUploadError] = useState<{
    message: string;
    issues: string[];
  }>();

  const [currentPage, setCurrentPage] = useState<Page | undefined>(funnel?.pages[0]);

  const handlePageChange = (pageId: string) => {
    const page = funnel?.pages.find((page) => page.id === pageId);
    if (!page) {
      return;
    }

    setCurrentPage(page);
  };

  const currentPageNumber = useMemo(() => {
    if (!funnel || !currentPage) {
      return 0;
    }

    const pageIndex = funnel.pages.findIndex((page) => page.id === currentPage.id);
    return pageIndex !== -1 ? pageIndex + 1 : 0;
  }, [funnel, currentPage]);

  async function handleFunnelFileUpload(file: File) {
    try {
      const fileContent = await file.text();
      const funnel = parseFunnelJson(fileContent);

      if (funnel.success) {
        setFunnel(funnel.data);
        setCurrentPage(funnel.data.pages[0]);
        return;
      }

      setUploadError(funnel.error);
      setFunnel(undefined);
    } catch (error) {
      setUploadError({
        message: "Unexpected error while parsing the funnel",
        issues: [error instanceof Error ? error.message : "Unknown error"],
      });
      setFunnel(undefined);
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="shadow-md border-b-1 border-b-muted">
        <FunnelHeader
          classNames={`max-w-[${MAX_CONTAINER_WIDTH_PX}px] mx-auto`}
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
        className={`p-4 flex-1 flex justify-center h-full w-full max-w-[${MAX_CONTAINER_WIDTH_PX}px] mx-auto`}
      >
        <div className="flex gap-4 w-full h-auto">
          <div className="hidden md:block min-w-[250px] w-1/4">
            <FunnelSidebar onPageSelection={handlePageChange} hasFunnel={!!funnel} pages={funnel?.pages} />
          </div>

          {!funnel && (
            <div className="w-full max-w-2xl flex flex-col items-center gap-y-4">
              <FileUploadZone
                title="Upload Funnel JSON"
                description="Drag and drop your funnel JSON file here, or click the button below to select a file"
                onFileSelected={handleFunnelFileUpload}
                acceptedFileTypes="application/json"
                onDragOver={() => setUploadError(undefined)}
                onDialogOpen={() => setUploadError(undefined)}
                className="w-full h-min"
              />
              {uploadError && <FunnelError error={uploadError} />}
            </div>
          )}

          {currentPage && <PageRenderer page={currentPage} />}
        </div>
      </div>
    </div>
  );
}
