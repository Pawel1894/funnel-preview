import { FileUpload } from "@/libs/file-upload";
import { FunnelHeader } from "./funnel-header";
import { FunnelSidebar } from "./funnel-sidebar";

const MAX_CONTAINER_WIDTH_PX = 1440;

export function FunnelContainer() {
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
          <div className="h-min w-full flex justify-center">
            <FileUpload
              title="Upload Funnel JSON"
              description="Drag and drop your funnel JSON file here, or click the button below to select a file"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
