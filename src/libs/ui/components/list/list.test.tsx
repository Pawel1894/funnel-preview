import { render, screen, act, userEvent, waitFor } from "@/test/test-utils";
import { List, ListItem } from "./list";

describe("List", () => {
  it("renders a list with items", () => {
    render(
      <List>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders as an ordered list when ordered prop is true", () => {
    const { container } = render(
      <List ordered>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    const orderedList = container.querySelector("ol");
    expect(orderedList).toBeInTheDocument();
  });

  it("calls onSelect when item is clicked", async () => {
    const onSelectMock = vi.fn();

    render(
      <List onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    await userEvent.click(screen.getByText("Item 1"));
    expect(onSelectMock).toHaveBeenCalledWith("item1");
  });

  it("calls onSelect when enter is clicked", async () => {
    const onSelectMock = vi.fn();

    render(
      <List selectedItem="item1" onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    const item2 = screen.getByText("Item 2");
    act(() => {
      item2.focus();
    });

    await userEvent.keyboard("{Enter}");
    expect(onSelectMock).toHaveBeenCalledWith("item2");
  });

  it("handles controlled selection state", async () => {
    const onSelectMock = vi.fn();

    const { rerender } = render(
      <List selectedItem="item1" onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    const item1 = screen.getByText("Item 1");
    expect(item1).toHaveAttribute("aria-current", "true");

    await userEvent.click(screen.getByText("Item 2"));
    expect(onSelectMock).toHaveBeenCalledWith("item2");

    rerender(
      <List selectedItem="item2" onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    const item2 = screen.getByText("Item 2");
    expect(item2).toHaveAttribute("aria-current", "true");
  });

  it("handles keyboard navigation", async () => {
    const onSelectMock = vi.fn();

    render(
      <List onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
        <ListItem id="item3">Item 3</ListItem>
      </List>
    );

    const item1 = screen.getByText("Item 1");

    act(() => {
      item1.focus();
    });

    await userEvent.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("Item 2");

    await userEvent.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("Item 3");

    await userEvent.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveTextContent("Item 1");

    await userEvent.keyboard("{ArrowUp}");
    expect(document.activeElement).toHaveTextContent("Item 3");

    await userEvent.keyboard("{Enter}");

    waitFor(() => {
      expect(onSelectMock).toHaveBeenCalledWith("item3");
    });
  });

  it("maintains focus state independently of selection", async () => {
    const onSelectMock = vi.fn();

    render(
      <List selectedItem="item1" onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    const item2 = screen.getByText("Item 2");
    act(() => {
      item2.focus();
    });

    expect(document.activeElement).toHaveTextContent("Item 2");
    expect(screen.getByText("Item 1")).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("Item 2")).toHaveAttribute("aria-current", "false");
  });
});
