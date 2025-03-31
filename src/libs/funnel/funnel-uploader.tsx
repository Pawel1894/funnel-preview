"use client";

import { useState } from "react";
import { FileUploadZone } from "@/libs/ui";
import { FunnelError } from "./funnel-error";
import { parseFunnelJson } from "./parser/funnel-parser";
import { Funnel } from "./domain/funnel";

type FunnelUploaderProps = {
  onFunnelLoaded: (funnel: Funnel) => void;
};

export function FunnelUploader({ onFunnelLoaded }: FunnelUploaderProps) {
  const [uploadError, setUploadError] = useState<{
    message: string;
    issues: string[];
  }>();

  const handleFunnelFileUpload = async (file: File) => {
    try {
      const fileContent = await file.text();
      const parsedFunnel = parseFunnelJson(fileContent);

      if (parsedFunnel.success) {
        setUploadError(undefined);
        onFunnelLoaded(parsedFunnel.data);
        return;
      }

      setUploadError(parsedFunnel.error);
    } catch (error) {
      setUploadError({
        message: "Unexpected error while parsing the funnel",
        issues: [error instanceof Error ? error.message : "Unknown error"],
      });
    }
  };

  const onClearError = () => {
    setUploadError(undefined);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-y-4">
      <FileUploadZone
        title="Upload Funnel JSON"
        description="Drag and drop your funnel JSON file here, or click the button below to select a file"
        onFileSelected={handleFunnelFileUpload}
        acceptedFileTypes="application/json"
        onDragOver={onClearError}
        onDialogOpen={onClearError}
        className="w-full h-min"
      />
      {uploadError && <FunnelError error={uploadError} onClose={onClearError} />}
    </div>
  );
}
