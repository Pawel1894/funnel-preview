import { Dropdown, DropdownContent, List, ListItem, TrashIcon, UploadIcon } from "@/libs/ui";
import { useCallback, useRef } from "react";
import { parseFunnelJson } from "./parser/funnel-parser";
import { Funnel } from "./funnel";

type FunnelViewerHeaderProps = {
  onClear?: () => void;
  onFunnelLoaded?: (funnel: Funnel) => void;
  onError?: (error: { message: string; issues: string[] } | null) => void;
};

export function FunnelSelectionDropdown({ onClear, onFunnelLoaded, onError }: FunnelViewerHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const fileContent = await file.text();
      const parsedFunnel = parseFunnelJson(fileContent);

      if (parsedFunnel.success) {
        onFunnelLoaded?.(parsedFunnel.data);
        onError?.(null);
        return;
      }

      onError?.(parsedFunnel.error);
    } catch (error) {
      onError?.({
        message: error instanceof Error ? error.message : "Unknown error occurred",
        issues: [],
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearError = useCallback(() => {
    onError?.(null);
  }, [onError]);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
      />
      <Dropdown
        selectedText="Change Funnel"
        placeholder="Select action"
        variant="primary"
        onOpen={handleClearError}
      >
        <DropdownContent className="w-2xs">
          <List>
            <ListItem id="clear-funnel" onClick={onClear}>
              <div className="flex items-center gap-2">
                <TrashIcon className="size-4" />
                Clear Current Funnel
              </div>
            </ListItem>
            <ListItem id="upload-funnel" onClick={handleUploadClick}>
              <div className="flex items-center gap-2">
                <UploadIcon className="size-4" />
                Upload New Funnel
              </div>
            </ListItem>
          </List>
        </DropdownContent>
      </Dropdown>
    </>
  );
}
