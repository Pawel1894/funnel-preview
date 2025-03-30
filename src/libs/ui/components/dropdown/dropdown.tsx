import { useState, useCallback, createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { ChevronDownIcon } from "@/libs/ui";

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeAfterSelect: boolean;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown provider");
  }
  return context;
};

export type DropdownProps = {
  children: React.ReactNode;
  selectedText?: string;
  placeholder?: string;
  className?: string;
  onSelect?: () => void;
  closeOnSelect?: boolean;
};

const dropdownVariants = cva(
  "cursor-pointer inline-flex items-center justify-between rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export function Dropdown({
  children,
  selectedText,
  className,
  onSelect,
  placeholder = "Select an option",
  closeOnSelect = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const handleClickOutside = (event: MouseEvent) => {
        if (node && !node.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && onSelect) {
      onSelect();
    }
  };

  const buttonStyles = twMerge(dropdownVariants({ variant: "primary" }), "h-10 px-4 py-2 w-full", className);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, closeAfterSelect: closeOnSelect }}>
      <div className="relative" ref={dropdownRef}>
        <button type="button" onClick={toggleDropdown} className={buttonStyles}>
          <span>{selectedText ?? placeholder}</span>
          <ChevronDownIcon />
        </button>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export type DropdownContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function DropdownContent({ children, className }: DropdownContentProps) {
  const { isOpen, closeAfterSelect, setIsOpen } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div
      className={twMerge(
        "absolute z-10 w-full mt-1 bg-background border border-muted rounded-md shadow-lg",
        className
      )}
    >
      <div onClick={() => closeAfterSelect && setIsOpen(false)} className="py-1">
        {children}
      </div>
    </div>
  );
}
