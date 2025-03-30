import { act, createKeyboardEventStub, renderHook } from "@/test/test-utils";

import { useListNavigation } from "./use-list-navigation";

describe("useListNavigation", () => {
  it("should register item IDs correctly", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.registerItem("item2");
    });

    expect(result.current.itemIds).toEqual(["item1", "item2"]);
  });

  it("should handle controlled selection", () => {
    const onSelectMock = vi.fn();
    const { result, rerender } = renderHook(
      ({ selectedItem }) => useListNavigation({ onSelect: onSelectMock, selectedItem }),
      { initialProps: { selectedItem: "item1" } }
    );

    expect(result.current.selectedItemId).toBe("item1");

    act(() => {
      result.current.handleItemSelect("item2");
    });

    expect(onSelectMock).toHaveBeenCalledWith("item2");
    expect(result.current.selectedItemId).toBe("item1");

    rerender({ selectedItem: "item2" });
    expect(result.current.selectedItemId).toBe("item2");
  });

  it("should handle focus state independently of selection", () => {
    const { result } = renderHook(() => useListNavigation({ selectedItem: "item1" }));

    act(() => {
      result.current.registerItem("item1");
      result.current.registerItem("item2");
      result.current.handleItemFocus("item2");
    });

    expect(result.current.selectedItemId).toBe("item1");
    expect(result.current.focusedItemId).toBe("item2");
  });

  it("should handle keyboard navigation", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.registerItem("item2");
      result.current.registerItem("item3");
      result.current.handleItemFocus("item1");
    });

    expect(result.current.focusedItemId).toBe("item1");

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "ArrowDown",
        })
      );
    });

    expect(result.current.focusedItemId).toBe("item2");

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "ArrowUp",
        })
      );
    });

    expect(result.current.focusedItemId).toBe("item1");
  });

  it("should loop through items when navigating", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.registerItem("item2");
      result.current.handleItemFocus("item2");
    });

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "ArrowDown",
        })
      );
    });

    expect(result.current.focusedItemId).toBe("item1");

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "ArrowUp",
        })
      );
    });

    expect(result.current.focusedItemId).toBe("item2");
  });

  it("should select focused item on Enter key", () => {
    const onSelectMock = vi.fn();
    const { result } = renderHook(() => useListNavigation({ onSelect: onSelectMock }));

    act(() => {
      result.current.registerItem("item1");
      result.current.handleItemFocus("item1");
    });

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "Enter",
        })
      );
    });

    expect(onSelectMock).toHaveBeenCalledWith("item1");
  });

  it("should handle item focus", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.handleItemFocus("item1");
    });

    expect(result.current.focusedItemId).toBe("item1");
  });

  it("should handle item blur", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.handleItemFocus("item1");
    });

    expect(result.current.focusedItemId).toBe("item1");

    act(() => {
      result.current.handleItemBlur();
    });

    expect(result.current.focusedItemId).toBeNull();
  });

  it("should loop focus to the first item when ArrowDown is pressed at the end of the list", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.registerItem("item2");

      result.current.handleItemFocus("item2");
    });

    expect(result.current.focusedItemId).toBe("item2");

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "ArrowDown",
        })
      );
    });

    expect(result.current.focusedItemId).toBe("item1");
  });

  it("should loop focus to the last item when ArrowUp is pressed at the beginning of the list", () => {
    const { result } = renderHook(() => useListNavigation());

    act(() => {
      result.current.registerItem("item1");
      result.current.registerItem("item2");

      result.current.handleItemFocus("item1");
    });

    expect(result.current.focusedItemId).toBe("item1");

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "ArrowUp",
        })
      );
    });

    expect(result.current.focusedItemId).toBe("item2");
  });

  it("should not select item if no item is focused on Enter key press", () => {
    const onSelectMock = vi.fn();
    const { result } = renderHook(() => useListNavigation({ onSelect: onSelectMock }));

    act(() => {
      result.current.registerItem("item1");
    });

    expect(result.current.focusedItemId).toBeNull();

    act(() => {
      result.current.handleKeyDown(
        createKeyboardEventStub({
          key: "Enter",
        })
      );
    });

    expect(result.current.selectedItemId).toBeNull();
    expect(onSelectMock).not.toHaveBeenCalled();
  });
});
