import { useState } from "react";

type UseListNavigationProps = {
  initialSelectedId?: string;
  onSelect?: (id: string) => void;
};

export function useListNavigation({ onSelect, initialSelectedId }: UseListNavigationProps = {}) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(initialSelectedId || null);
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

  return {
    selectedItemId,
    focusedItemId,
    itemIds,
    handleItemSelect,
    handleItemBlur,
    handleItemFocus,
    registerItem,
    handleKeyDown,
  };
}
