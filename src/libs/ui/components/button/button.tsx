import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

export type ButtonProps = Omit<HTMLMotionProps<"button">, "disabled"> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        outline: "border border-muted bg-transparent hover:bg-muted/20 text-foreground",
        ghost: "bg-transparent hover:bg-muted/20 text-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 py-3 text-base",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      disabled: false,
    },
  }
);

export function Button({ className, variant = "outline", size = "md", disabled, ...props }: ButtonProps) {
  const styles = twMerge(buttonVariants({ variant, size, disabled: disabled, className }));

  return (
    <motion.button
      className={styles}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      initial={false}
      disabled={disabled}
      {...props}
    />
  );
}
