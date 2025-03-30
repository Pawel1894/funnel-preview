import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const bannerVariants = cva("rounded-md p-3 border w-full h-full", {
  variants: {
    variant: {
      error: "bg-red-900/20 border-red-500/50 text-red-400",
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

const titleVariants = cva("font-semibold mb-1", {
  variants: {
    variant: {
      error: "text-red-300",
    },
  },
});

type BannerProps = {
  variant: "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Banner({ variant, title, children, className }: BannerProps) {
  return (
    <div aria-live="polite" className={twMerge(bannerVariants({ variant }), className)}>
      {title && <h3 className={titleVariants({ variant })}>{title}</h3>}
      {children}
    </div>
  );
}
