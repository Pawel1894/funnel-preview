import { render, screen, userEvent, waitFor } from "@/test/test-utils";
import { Dropdown, DropdownContent } from "./dropdown";

describe("Dropdown", () => {
  it("renders dropdown with placeholder", () => {
    render(
      <Dropdown>
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders dropdown with selected text", () => {
    render(
      <Dropdown selectedText="Selected Option">
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    expect(screen.getByText("Selected Option")).toBeInTheDocument();
  });

  it("opens and closes on click", async () => {
    render(
      <Dropdown>
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    const dropdownButton = screen.getByText("Select an option");
    expect(dropdownButton).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(dropdownButton);
    expect(dropdownButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();

    await userEvent.click(dropdownButton);
    await waitFor(() => {
      expect(dropdownButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("closes when clicking outside", async () => {
    render(
      <Dropdown>
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    const dropdownButton = screen.getByText("Select an option");
    await userEvent.click(dropdownButton);
    expect(dropdownButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    await userEvent.click(document.body);
    await waitFor(() => {
      expect(dropdownButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("calls onSelect when option is clicked", async () => {
    const onSelectMock = vi.fn();

    render(
      <Dropdown onSelect={onSelectMock}>
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    const dropdownButton = screen.getByText("Select an option");
    await userEvent.click(dropdownButton);
    expect(dropdownButton).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(screen.getByText("Option 1"));
    expect(onSelectMock).toHaveBeenCalled();
  });

  it("maintains open state when closeOnSelect is false", async () => {
    render(
      <Dropdown closeOnSelect={false}>
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    const dropdownButton = screen.getByText("Select an option");
    await userEvent.click(dropdownButton);
    expect(dropdownButton).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(screen.getByText("Option 1"));
    expect(dropdownButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls onOpen when dropdown state changes", async () => {
    const onOpenMock = vi.fn();

    render(
      <Dropdown onOpen={onOpenMock}>
        <DropdownContent>
          <div>Option 1</div>
          <div>Option 2</div>
        </DropdownContent>
      </Dropdown>
    );

    const dropdownButton = screen.getByText("Select an option");
    await userEvent.click(dropdownButton);
    expect(dropdownButton).toHaveAttribute("aria-expanded", "true");

    waitFor(() => {
      expect(onOpenMock).toHaveBeenCalledWith(true);
    });
  });
});
