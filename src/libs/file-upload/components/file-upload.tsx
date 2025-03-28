import { Button, UploadIcon } from "@/libs/ui";

export type FileUploadProps = {
  title: string;
  description: string;
};

export function FileUpload({ description, title }: FileUploadProps) {
  return (
    <div className="max-w-2xl h-[75vh] max-h-[500px] border-muted border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-y-4">
      <UploadIcon className="size-14 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-center text-muted-foreground px-8 max-w-lg">
        {description}
      </p>
      <Button variant="primary">Select file</Button>
    </div>
  );
}
