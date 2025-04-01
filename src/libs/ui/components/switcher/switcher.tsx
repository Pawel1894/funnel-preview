import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

export type SwitcherOption = {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
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
    <TooltipProvider delayDuration={100}>
      <motion.div className={twMerge(switcherVariants(), className)}>
        {options.map((option) => (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => onChange(option.value)}
                className={optionVariants({ active: value === option.value })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.icon}
                {option.label && <span>{option.label}</span>}
              </motion.button>
            </TooltipTrigger>
            {option.tooltip && <TooltipContent>{option.tooltip}</TooltipContent>}
          </Tooltip>
        ))}
      </motion.div>
    </TooltipProvider>
  );
}
