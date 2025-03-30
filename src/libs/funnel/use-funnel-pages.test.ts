import { renderHook, act } from "@testing-library/react";
import { Page } from "./funnel";
import { useFunnelPages } from "./use-funnel-pages";

describe("useFunnelPages", () => {
  const mockPages: Page[] = [
    {
      id: "page1",
      blocks: [
        {
          id: "block1",
          type: "text",
          text: "Hello World",
          color: "#000000",
          align: "left",
        },
      ],
    },
    {
      id: "page2",
      blocks: [
        {
          id: "block2",
          type: "button",
          text: "Click Me",
          color: "white",
          bgColor: "blue",
        },
      ],
    },
    {
      id: "page3",
      blocks: [],
    },
  ];

  it("should initialize with the first page", () => {
    const { result } = renderHook(() => useFunnelPages(mockPages));

    expect(result.current.currentPage).toEqual(mockPages[0]);
    expect(result.current.currentPageNumber).toBe(1);
    expect(result.current.totalPages).toBe(3);
  });

  it("should handle page changes correctly", () => {
    const { result } = renderHook(() => useFunnelPages(mockPages));

    act(() => {
      result.current.handlePageChange("page2");
    });

    expect(result.current.currentPage).toEqual(mockPages[1]);
    expect(result.current.currentPageNumber).toBe(2);

    act(() => {
      result.current.handlePageChange("page3");
    });

    expect(result.current.currentPage).toEqual(mockPages[2]);
    expect(result.current.currentPageNumber).toBe(3);
  });

  it("should not change page when an invalid page ID is provided", () => {
    const { result } = renderHook(() => useFunnelPages(mockPages));

    const initialPage = result.current.currentPage;

    act(() => {
      result.current.handlePageChange("non-existent-page");
    });

    expect(result.current.currentPage).toEqual(initialPage);
  });

  it("should return correct total pages", () => {
    const { result } = renderHook(() => useFunnelPages(mockPages));
    expect(result.current.totalPages).toBe(3);

    const { result: emptyResult } = renderHook(() => useFunnelPages([]));
    expect(emptyResult.current.totalPages).toBe(0);
  });

  it("should handle empty pages array gracefully", () => {
    const { result } = renderHook(() => useFunnelPages([]));

    expect(result.current.currentPage).toBeUndefined();
    expect(result.current.currentPageNumber).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it("should handle undefined pages gracefully", () => {
    const { result } = renderHook(() => useFunnelPages(undefined));

    expect(result.current.currentPage).toBeUndefined();
    expect(result.current.currentPageNumber).toBe(0);
    expect(result.current.totalPages).toBe(0);
  });

  it("should update when pages array changes", () => {
    const { result, rerender } = renderHook((props) => useFunnelPages(props.pages), {
      initialProps: { pages: mockPages },
    });

    expect(result.current.totalPages).toBe(3);

    act(() => {
      result.current.handlePageChange("page2");
    });

    expect(result.current.currentPage).toEqual(mockPages[1]);

    const newPages: Page[] = [
      {
        id: "page4",
        blocks: [
          {
            id: "block1",
            type: "text",
            text: "Hello World",
            color: "#000000",
            align: "left",
          },
        ],
      },
      {
        id: "page5",
        blocks: [
          {
            id: "block2",
            type: "button",
            text: "Click Me",
            color: "white",
            bgColor: "blue",
          },
        ],
      },
    ];

    rerender({ pages: newPages });

    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentPage).toEqual(newPages[0]);
  });
});
