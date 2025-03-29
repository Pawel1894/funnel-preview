import Image from "next/image";

type FunnelHeaderProps = {
  funnelTitle?: string;
  pagination?: {
    current: number;
    total: number;
  };
};

export function FunnelHeader({ funnelTitle, pagination }: FunnelHeaderProps) {
  return (
    <div className="flex items-center gap-x-4 p-4 shadow-md border-b-1 border-b-muted">
      <Image src="/logo.png" alt="Perspective.co company logo" width={36} height={36} />
      <div className="flex flex-col justify-center min-w-0">
        <h1 title={funnelTitle} className="text-xl font-bold truncate">
          {funnelTitle ?? "Funnel preview"}
        </h1>
        {pagination && (
          <span className="text-sm text-muted-foreground">
            Page {pagination.current} of {pagination.total}
          </span>
        )}
      </div>
    </div>
  );
}
