import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export type SwitcherOption = {
  value: string;
  label?: string;
  icon?: React.ReactNode;
};

export type SwitcherProps = {
  options: SwitcherOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const switcherVariants = cva("inline-flex items-center gap-1 rounded-md border border-muted p-1 text-sm", {
  variants: {
    variant: {
      primary: "bg-background",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const optionVariants = cva(
  "cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded transition-colors",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground",
        false: "text-muted-foreground hover:text-foreground hover:bg-muted/20",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export function Switcher({ options, value, onChange, className }: SwitcherProps) {
  return (
    <motion.div className={twMerge(switcherVariants(), className)}>
      {options.map((option) => (
        <motion.button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={optionVariants({ active: value === option.value })}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {option.icon}
          {option.label && <span>{option.label}</span>}
        </motion.button>
      ))}
    </motion.div>
  );
}
