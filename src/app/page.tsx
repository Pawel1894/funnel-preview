import { FileUpload } from "@/libs/file-upload";
import { FunnelHeader } from "@/libs/funnel";

export default function Home() {
  return (
    <>
      <FunnelHeader />
      <main className="p-4">
        <FileUpload
          title="Upload Funnel JSON"
          description="Drag and drop your funnel JSON file here, or click the button below to select a file"
        />
      </main>
    </>
  );
}
