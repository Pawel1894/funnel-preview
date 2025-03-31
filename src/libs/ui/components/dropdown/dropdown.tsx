import { useState, useCallback, createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

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
  variant?: "primary" | "outline";
  onOpen?: (isOpen: boolean) => void;
};

const dropdownVariants = cva(
  "cursor-pointer inline-flex items-center gap-2 justify-between rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        outline: "border border-muted bg-transparent hover:bg-muted/20 text-foreground",
      },
    },
    defaultVariants: {
      variant: "outline",
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
  variant = "outline",
  onOpen,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const handleClickOutside = (event: MouseEvent) => {
          if (node && !node.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    },
    []
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!isOpen && onSelect) {
      onSelect();
    }

    if (!isOpen) {
      onOpen?.(isOpen);
    }
  };

  const buttonStyles = twMerge(dropdownVariants({ variant }), "h-10 px-4 py-2 w-full", className);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, closeAfterSelect: closeOnSelect }}>
      <div className="relative" ref={dropdownRef}>
        <motion.button 
          type="button" 
          onClick={toggleDropdown} 
          className={buttonStyles}
          whileTap={{ scale: 0.98 }}
        >
          <span>{selectedText ?? placeholder}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon />
          </motion.span>
        </motion.button>
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className={twMerge(
            "absolute z-10 w-full mt-1 bg-background border border-muted rounded-md shadow-lg",
            className
          )}
          onClick={() => closeAfterSelect && setIsOpen(false)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
