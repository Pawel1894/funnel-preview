import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export type SwitcherOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type SwitcherProps = {
  options: SwitcherOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const switcherVariants = cva(
  "inline-flex items-center gap-1 rounded-md border border-muted p-1 text-sm",
  {
    variants: {
      variant: {
        primary: "bg-background",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

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
    <div className={twMerge(switcherVariants(), className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={optionVariants({ active: value === option.id })}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
} 