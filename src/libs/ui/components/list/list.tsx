import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ListContextType = {
  selectedItemId: string | null;
  focusedItemId: string | null;
  onSelect: (id: string) => void;
  onFocus: (id: string) => void;
  onBlur: () => void;
  registerItem: (id: string) => void;
};

const ListContext = createContext<ListContextType | null>(null);

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

type ListProps = {
  children: React.ReactNode;
  ordered?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
};

export function List({ children, ordered = false, onSelect, className }: ListProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [itemIds, setItemIds] = useState<string[]>([]);

  const registerItem = (id: string) => {
    setItemIds((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleItemSelect = (id: string) => {
    setSelectedItemId(id);
    onSelect?.(id);
  };

  const handleItemFocus = (id: string) => {
    setFocusedItemId(id);
  };

  const handleItemBlur = () => {
    setFocusedItemId(null);
  };

  const currentFocusedItemIndex = focusedItemId ? itemIds.indexOf(focusedItemId) : -1;

  const focusNextItem = () => {
    const nextItemIndex = currentFocusedItemIndex < itemIds.length - 1 ? currentFocusedItemIndex + 1 : 0;
    handleItemFocus(itemIds[nextItemIndex]);
  };

  const focusPreviousItem = () => {
    const prevItemindex = currentFocusedItemIndex > 0 ? currentFocusedItemIndex - 1 : itemIds.length - 1;
    handleItemFocus(itemIds[prevItemindex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusNextItem();
        break;
      case "ArrowUp":
        e.preventDefault();
        focusPreviousItem();
        break;
      case "Enter":
        e.preventDefault();
        if (focusedItemId) {
          handleItemSelect(focusedItemId);
        }
    }
  };

  const Tag = ordered ? "ol" : "ul";

  return (
    <ListContext.Provider
      value={{
        selectedItemId,
        focusedItemId,
        onSelect: handleItemSelect,
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

const listItemVariants = cva(
  "px-4 py-2 rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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

type ListItemProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

function Item({ children, id, className }: ListItemProps) {
  const context = useContext(ListContext);
  const itemRef = useRef<HTMLLIElement>(null);

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

  const styles = twMerge(listItemVariants({ active: isActive }), className);

  return (
    <li
      ref={itemRef}
      className={styles}
      onClick={() => onSelect(id)}
      onFocus={() => onFocus(id)}
      onBlur={onBlur}
      tabIndex={0}
      role="option"
      aria-selected={isActive}
    >
      {children}
    </li>
  );
}

List.Item = Item;
