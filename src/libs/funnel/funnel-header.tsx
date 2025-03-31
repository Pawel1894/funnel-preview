import Image from "next/image";
import { twMerge } from "tailwind-merge";

type FunnelHeaderProps = {
  funnelTitle?: string;
  pagination?: {
    current: number;
    total: number;
  };
  classNames?: string;
};

export function FunnelHeader({ funnelTitle, pagination, classNames }: FunnelHeaderProps) {
  return (
    <div className={twMerge("flex items-center gap-x-4 p-4", classNames)}>
      <Image src="/logo.png" aria-hidden alt="" width={36} height={36} />
      <div className="flex flex-col justify-center min-w-0">
        <h1 title={funnelTitle} className="text-xl font-bold truncate">
          {funnelTitle ?? "Funnel preview"}
        </h1>
        <span className="text-sm text-muted-foreground">
          {pagination ? `Page ${pagination.current} of ${pagination.total}` : "No funnel uploaded"}
        </span>
      </div>
    </div>
  );
}
