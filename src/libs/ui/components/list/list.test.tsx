import { render, screen, fireEvent, act, userEvent } from "@/test/test-utils";
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

  it("selects item on click", async () => {
    const onSelectMock = vi.fn();

    render(
      <List onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    await userEvent.click(screen.getByText("Item 1"));

    expect(onSelectMock).toHaveBeenCalledWith("item1");

    const item1 = screen.getByText("Item 1");
    expect(item1).toHaveAttribute("aria-selected", "true");
  });

  it("selects focused item with Enter key", async () => {
    const onSelectMock = vi.fn();

    render(
      <List onSelect={onSelectMock}>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
      </List>
    );

    const item1 = screen.getByText("Item 1");

    act(() => {
      item1.focus();
    });

    fireEvent.keyDown(item1, { key: "Enter" });

    expect(onSelectMock).toHaveBeenCalledWith("item1");
    expect(item1).toHaveAttribute("aria-selected", "true");
  });

  it("navigates through items with arrow keys", async () => {
    render(
      <List>
        <ListItem id="item1">Item 1</ListItem>
        <ListItem id="item2">Item 2</ListItem>
        <ListItem id="item3">Item 3</ListItem>
      </List>
    );

    const item1 = screen.getByText("Item 1");

    act(() => {
      item1.focus();
    });

    fireEvent.keyDown(item1, { key: "ArrowDown" });
    expect(document.activeElement).toHaveTextContent("Item 2");

    fireEvent.keyDown(document.activeElement as Element, { key: "ArrowDown" });
    expect(document.activeElement).toHaveTextContent("Item 3");

    fireEvent.keyDown(document.activeElement as Element, { key: "ArrowDown" });
    expect(document.activeElement).toHaveTextContent("Item 1");

    fireEvent.keyDown(document.activeElement as Element, { key: "ArrowUp" });
    expect(document.activeElement).toHaveTextContent("Item 3");
  });
});
