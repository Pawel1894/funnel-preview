"use client";

import { useState } from "react";
import { FileUploadZone } from "@/libs/ui";

import { FunnelHeader } from "./funnel-header";
import { FunnelSidebar } from "./funnel-sidebar";
import { parseFunnelJson } from "./parser/funnel-parser";
import { FunnelError } from "./funnel-error";

const MAX_CONTAINER_WIDTH_PX = 1440;

export function FunnelContainer() {
  const [funnelError, setFunnelError] = useState<{
    message: string;
    issues: string[];
  }>();

  async function handleFunnelFileUpload(file: File) {
    try {
      const fileContent = await file.text();
      const funnel = parseFunnelJson(fileContent);

      if (funnel.success) {
        const { data } = funnel;

        console.log(`Loaded funnel: ${data.name} with ${data.pages.length} pages`);
      } else {
        funnel.error.issues.forEach((issue) => console.error(issue));
        setFunnelError(funnel.error);
      }
    } catch (error) {
      setFunnelError({
        message: "Unexpected error while parsing the funnel",
        issues: [error instanceof Error ? error.message : "Unknown error"],
      })
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="shadow-md border-b-1 border-b-muted">
        <FunnelHeader classNames={`max-w-[${MAX_CONTAINER_WIDTH_PX}px] mx-auto`} />
      </div>
      <div
        className={`p-4 flex-1 flex justify-center h-full w-full max-w-[${MAX_CONTAINER_WIDTH_PX}px] mx-auto`}
      >
        <div className="flex gap-4 w-full h-auto">
          <div className="hidden md:block min-w-[250px] w-1/4">
            <FunnelSidebar />
          </div>
          <div className="w-full max-w-2xl flex flex-col items-center gap-y-4">
            <FileUploadZone
              title="Upload Funnel JSON"
              description="Drag and drop your funnel JSON file here, or click the button below to select a file"
              onFileSelected={handleFunnelFileUpload}
              acceptedFileTypes="application/json"
              onDragOver={() => setFunnelError(undefined)}
              onDialogOpen={() => setFunnelError(undefined)}
              className="w-full h-min"
            />
            {funnelError && <FunnelError error={funnelError} />}
          </div>
        </div>
      </div>
    </div>
  );
}
