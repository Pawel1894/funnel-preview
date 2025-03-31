import { render, screen, waitFor } from "@/test/test-utils";
import { PageRenderer } from "./page-renderer";
import { Page } from "../funnel";

const mockPage: Page = {
  id: "page1",
  blocks: [
    {
      id: "text1",
      type: "text",
      text: "Test Text Block",
      color: "#000000",
      align: "left",
    },
    {
      id: "image1",
      type: "image",
      src: "https://example.com/image.jpg",
      alt: "Test Image",
    },
    {
      id: "list1",
      type: "list",
      items: [
        {
          id: "item1",
          title: "List Item 1",
          description: "Description 1",
          src: "https://picsum.photos/32/32",
        },
        {
          id: "item2",
          title: "List Item 2",
          src: "https://picsum.photos/32/32",
        },
      ],
    },
    {
      id: "button1",
      type: "button",
      text: "Click Me",
      color: "#FFFFFF",
      bgColor: "#007BFF",
    },
  ],
};

describe("PageRenderer", () => {
  it("renders empty state when no page is provided", () => {
    render(<PageRenderer bgColor="#FFFFFF" />);

    expect(screen.getByText("No content")).toBeInTheDocument();
    expect(screen.getByText("This page is empty. Add some blocks to get started.")).toBeInTheDocument();
  });

  it("renders empty state when page has no blocks", () => {
    render(<PageRenderer page={{ id: "page1", blocks: [] }} bgColor="#FFFFFF" />);

    expect(screen.getByText("No content")).toBeInTheDocument();
    expect(screen.getByText("This page is empty. Add some blocks to get started.")).toBeInTheDocument();
  });

  it("renders all block types correctly", () => {
    render(<PageRenderer page={mockPage} bgColor="#FFFFFF" />);

    const textBlock = screen.getByText("Test Text Block");
    expect(textBlock).toBeInTheDocument();
    expect(textBlock).toHaveStyle({
      textAlign: "left",
      color: "#000000",
    });

    const imageContainer = screen.getByAltText("Test Image").parentElement;
    expect(imageContainer).toBeInTheDocument();
    expect(screen.getByAltText("Test Image")).toHaveAttribute("src", "https://example.com/image.jpg");

    const listContainer = screen.getByRole("list");
    expect(listContainer).toBeInTheDocument();
    expect(screen.getByText("List Item 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("List Item 2")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
    expect(button).toHaveStyle({
      backgroundColor: "#007BFF",
      color: "#FFFFFF",
    });
  });

  it("applies correct background color", () => {
    const bgColor = "#FF0000";
    render(<PageRenderer page={mockPage} bgColor={bgColor} />);

    const container = screen.getByTestId("page-container");
    expect(container).toHaveStyle({ backgroundColor: bgColor });
  });

  it("renders with mobile viewport by default", () => {
    render(<PageRenderer page={mockPage} bgColor="#FFFFFF" />);

    const container = screen.getByTestId("page-container");
    waitFor(() => {
      expect(container).toHaveStyle({
        width: "375px",
        minHeight: "600px",
      });
    });
  });

  it("renders with desktop viewport when specified", () => {
    render(<PageRenderer page={mockPage} bgColor="#FFFFFF" viewMode="desktop" />);

    const container = screen.getByTestId("page-container");
    waitFor(() => {
      expect(container).toHaveStyle({
        width: "1280px",
        minHeight: "800px",
      });
    });
  });
});
