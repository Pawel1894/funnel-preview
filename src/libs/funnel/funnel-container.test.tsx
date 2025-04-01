import { render, screen, waitFor, userEvent, act } from "@/test/test-utils";
import { FunnelContainer } from "./funnel-container";
import { Funnel } from "./domain/funnel";

const mockFunnel: Funnel = {
  name: "Test Funnel",
  bgColor: "#FFFFFF",
  pages: [
    {
      id: "page1",
      blocks: [
        {
          id: "text1",
          type: "text",
          text: "Page 1 Content",
          color: "#000000",
          align: "left",
        },
      ],
    },
    {
      id: "page2",
      blocks: [
        {
          id: "text2",
          type: "text",
          text: "Page 2 Content",
          color: "#000000",
          align: "left",
        },
      ],
    },
  ],
};

const createTestFile = (content: string) => {
  const file = new File([content], "funnel.json", { type: "application/json" });
  file.text = async () => content;
  return file;
};

describe("FunnelContainer", () => {
  it("renders funnel uploader when no funnel is loaded", () => {
    render(<FunnelContainer />);

    expect(screen.getByText("Upload Funnel JSON")).toBeInTheDocument();
    expect(
      screen.getByText("Drag and drop your funnel JSON file here, or click the button below to select a file")
    ).toBeInTheDocument();
  });

  it("renders funnel viewer when a funnel is loaded", async () => {
    render(<FunnelContainer />);

    const file = createTestFile(JSON.stringify(mockFunnel));
    const fileInput = screen.getByTestId("file-upload-input");
    await userEvent.upload(fileInput, file);

    waitFor(() => {
      expect(screen.getByText("Test Funnel")).toBeInTheDocument();
      expect(screen.getByText("Page 1 Content")).toBeInTheDocument();
    });
  });

  it("handles funnel clearing", async () => {
    render(<FunnelContainer />);

    const file = createTestFile(JSON.stringify(mockFunnel));
    const fileInput = screen.getByTestId("file-upload-input");

    await act(async () => {
      await userEvent.upload(fileInput, file);
    });

    waitFor(() => {
      expect(screen.getByText("Test Funnel")).toBeInTheDocument();
    });

    const dropdownButton = screen.getByText("Change Funnel");
    await userEvent.click(dropdownButton);

    const clearButton = screen.getByText("Clear Current Funnel");
    await userEvent.click(clearButton);

    waitFor(() => {
      expect(screen.getByText("Upload Funnel JSON")).toBeInTheDocument();
    });
  });

  it("handles page navigation", async () => {
    render(<FunnelContainer />);

    const file = createTestFile(JSON.stringify(mockFunnel));
    const fileInput = screen.getByTestId("file-upload-input");
    await userEvent.upload(fileInput, file);

    waitFor(() => {
      expect(screen.getByText("Page 1 Content")).toBeInTheDocument();
    });

    const page2Button = screen.getByText("Page no. 2");
    await userEvent.click(page2Button);

    waitFor(() => {
      expect(screen.getByText("Page 2 Content")).toBeInTheDocument();
    });

    const page1Button = screen.getByText("Page no. 1");
    await userEvent.click(page1Button);

    waitFor(() => {
      expect(screen.getByText("Page 1 Content")).toBeInTheDocument();
    });
  });

  it("handles invalid funnel JSON", async () => {
    render(<FunnelContainer />);

    const file = createTestFile("{ invalid json }");
    const fileInput = screen.getByTestId("file-upload-input");
    await userEvent.upload(fileInput, file);

    waitFor(() => {
      expect(screen.getByText(/invalid json format/i)).toBeInTheDocument();
    });
  });

  it("maintains correct page count and current page number", async () => {
    render(<FunnelContainer />);

    const file = createTestFile(JSON.stringify(mockFunnel));
    const fileInput = screen.getByTestId("file-upload-input");
    await userEvent.upload(fileInput, file);

    waitFor(() => {
      expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
    });

    const page2Button = screen.getByText("Page no. 2");
    await userEvent.click(page2Button);

    waitFor(() => {
      expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
    });
  });
});
