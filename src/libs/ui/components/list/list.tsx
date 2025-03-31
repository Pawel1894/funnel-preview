"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HTMLMotionProps, motion } from "framer-motion";
import { useListNavigation } from "./use-list-navigation";

type ListContextType = {
  selectedItemId: string | null;
  focusedItemId: string | null;
  onSelect?: (id: string) => void;
  onFocus: (id: string) => void;
  onBlur: () => void;
  registerItem: (id: string) => void;
};

const ListContext = createContext<ListContextType | null>(null);

type ListProps = {
  children: React.ReactNode;
  ordered?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
  selectedItem?: string;
};

const listVariants = cva("w-full", {
  variants: {
    ordered: {
      true: "list-decimal list-inside",
      false: "list-none",
    },
  },
  defaultVariants: {
    ordered: false,
  },
});

export function List({ children, ordered = false, onSelect, className, selectedItem }: ListProps) {
  const { selectedItemId, focusedItemId, handleItemBlur, handleItemFocus, registerItem, handleKeyDown } =
    useListNavigation({
      selectedItem,
    });

  const Tag = ordered ? "ol" : "ul";

  return (
    <ListContext.Provider
      value={{
        selectedItemId,
        focusedItemId,
        onSelect,
        onBlur: handleItemBlur,
        onFocus: handleItemFocus,
        registerItem,
      }}
    >
      <Tag className={twMerge(listVariants({ ordered }), className)} onKeyDown={handleKeyDown}>
        {children}
      </Tag>
    </ListContext.Provider>
  );
}

type ListItemProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
} & HTMLMotionProps<"button">;

const listItemVariants = cva(
  "w-full text-left px-4 py-2 rounded-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-200",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground",
        false: "hover:bg-muted/20",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export function ListItem({ children, id, className, onClick, ...restProps }: ListItemProps) {
  const context = useContext(ListContext);
  const itemRef = useRef<HTMLButtonElement>(null);

  if (!context) throw new Error("List.Item must be used within List");

  const { selectedItemId, focusedItemId, onBlur, onSelect, onFocus, registerItem } = context;
  const isActive = selectedItemId === id;
  const isFocused = focusedItemId === id;

  useEffect(() => {
    registerItem(id);
  }, [id, registerItem]);

  useLayoutEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
    }
  }, [isFocused]);

  const handleClick = (e: React.MouseEvent) => {
    onSelect?.(id);
    onClick?.(e);
  };

  const handleFocus = () => {
    onFocus(id);
  };

  const styles = twMerge(listItemVariants({ active: isActive }), className);

  return (
    <motion.button
      ref={itemRef}
      className={styles}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={onBlur}
      tabIndex={0}
      role="listitem"
      aria-current={isActive}
      whileTap={{ scale: 0.98 }}
      {...restProps}
    >
      {children}
    </motion.button>
  );
}
