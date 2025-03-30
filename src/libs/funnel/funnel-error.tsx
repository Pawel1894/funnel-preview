import { Banner, Button, XMarkIcon } from "@/libs/ui";
import { useState } from "react";

type FunnelErrorProps = {
  error: {
    message: string;
    issues: string[];
  };
  onClose?: () => void;
};

export function FunnelError({ error, onClose }: FunnelErrorProps) {
  const [showAll, setShowAll] = useState(false);
  const displayIssues = showAll ? error.issues : error.issues.slice(0, 2);
  const hasMoreIssues = error.issues.length > 2;

  return (
    <div className="relative">
      {onClose && (
        <Button onClick={onClose} className="absolute right-2 top-2 z-10" variant="ghost">
          <XMarkIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      )}
      <Banner title={error.message} variant="error" className="overflow-auto h-min max-h-60">
        <ol className="list-decimal space-y-2 px-4">
          {displayIssues.map((issue, index) => (
            <li title={issue} key={index}>
              {issue}
            </li>
          ))}
          {hasMoreIssues && !showAll && (
            <li className="list-none">
              <Button
                variant="ghost"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowAll(true)}
              >
                Show {error.issues.length - 3} more issues
              </Button>
            </li>
          )}
        </ol>
      </Banner>
    </div>
  );
}
