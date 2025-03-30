import { Banner } from "@/libs/ui";

type FunnelErrorProps = {
  error: {
    message: string;
    issues: string[];
  };
};

export function FunnelError({ error }: FunnelErrorProps) {
  return (
    <Banner title={error.message} variant="error" className="overflow-auto h-min max-h-60">
      <ol className="list-decimal space-y-2 px-4">
        {error.issues.map((issue, index) => (
          <li title={issue} key={index}>{issue}</li>
        ))}
      </ol>
    </Banner>
  );
}
