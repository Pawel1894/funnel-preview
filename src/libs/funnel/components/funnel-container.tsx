import { FileUpload } from "@/libs/file-upload";
import { FunnelHeader } from "./funnel-header";
import { FunnelSidebar } from "./funnel-sidebar";

export function FunnelContainer() {
  return (
    <div>
      <FunnelHeader />
      <div className="p-4">
        <div className="grid grid-cols-[250px_1fr] gap-4">
          <FunnelSidebar />
          <FileUpload
            title="Upload Funnel JSON"
            description="Drag and drop your funnel JSON file here, or click the button below to select a file"
          />
        </div>
      </div>
    </div>
  );
}
