import { describe, it, expect } from "vitest";
import { parseFunnelJson } from "./funnel-parser";
import { Funnel, TextBlock } from "../funnel";

describe("parseFunnelJson", () => {
  it("should successfully parse valid funnel JSON", () => {
    const funnel: Partial<Funnel> = {
      name: "Test Funnel",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "text1",
              type: "text",
              text: "Hello World",
            } as TextBlock,
          ],
        },
      ],
    };

    const result = parseFunnelJson(JSON.stringify(funnel));

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toMatchObject({
        name: "Test Funnel",
        pages: [
          {
            id: "page1",
            blocks: [
              {
                id: "text1",
                type: "text",
                text: "Hello World",
              },
            ],
          },
        ],
      });
    }
  });

  it("should apply default values for optional fields", () => {
    const funnel: Partial<Funnel> = {
      name: "Minimal Funnel",
    };

    const minimalJson = JSON.stringify(funnel);

    const result = parseFunnelJson(minimalJson);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bgColor).toBe("#F5F5F5");
      expect(result.data.pages).toEqual([]);
    }
  });

  it("should parse a funnel with all block types", () => {
    const funnel: Funnel = {
      name: "Complex Funnel",
      bgColor: "#FFFFFF",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "text1",
              type: "text",
              text: "Text Block",
              color: "#333333",
              align: "center",
            },
            {
              id: "image1",
              type: "image",
              src: "https://example.com/image.jpg",
              alt: "Example Image",
            },
            {
              id: "list1",
              type: "list",
              items: [
                {
                  id: "item1",
                  title: "List Item 1",
                  description: "Description 1",
                },
                {
                  id: "item2",
                  title: "List Item 2",
                },
              ],
            },
            {
              id: "button1",
              type: "button",
              text: "Click Here",
              color: "#FFFFFF",
              bgColor: "#007BFF",
            },
          ],
        },
      ],
    };

    const result = parseFunnelJson(JSON.stringify(funnel));

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.pages[0].blocks).toHaveLength(4);

      expect(result.data.pages[0].blocks[0]).toStrictEqual({
        id: "text1",
        type: "text",
        text: "Text Block",
        color: "#333333",
        align: "center",
      });

      expect(result.data.pages[0].blocks[1]).toStrictEqual({
        id: "image1",
        type: "image",
        src: "https://example.com/image.jpg",
        alt: "Example Image",
      });

      expect(result.data.pages[0].blocks[2]).toStrictEqual({
        id: "list1",
        type: "list",
        items: [
          {
            id: "item1",
            title: "List Item 1",
            description: "Description 1",
          },
          {
            id: "item2",
            title: "List Item 2",
          },
        ],
      });

      expect(result.data.pages[0].blocks[3]).toStrictEqual({
        id: "button1",
        type: "button",
        text: "Click Here",
        color: "#FFFFFF",
        bgColor: "#007BFF",
      });
    }
  });

  it("should return error for invalid JSON syntax", () => {
    const invalidJson = '{name: "Invalid JSON",}';

    const result = parseFunnelJson(invalidJson);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe("Invalid JSON format");
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it("should return validation error for missing required fields", () => {
    const funnel: Partial<Funnel> = {
      pages: [],
    };

    const result = parseFunnelJson(JSON.stringify(funnel));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe("Invalid funnel format");
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it("should return validation error for invalid block type", () => {
    const funnel: Partial<Funnel> = {
      name: "Invalid Block Type",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "block1",
              type: "invalid-type",
              content: "Some content",
            } as unknown as TextBlock,
          ],
        },
      ],
    };

    const result = parseFunnelJson(JSON.stringify(funnel));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe("Invalid funnel format");
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it("should return validation error for invalid enum value", () => {
    const funnel: Partial<Funnel> = {
      name: "Invalid Align",
      pages: [
        {
          id: "page1",
          blocks: [
            {
              id: "text1",
              type: "text",
              text: "Hello",
              align: "invalid-align",
            } as unknown as TextBlock,
          ],
        },
      ],
    };

    const result = parseFunnelJson(JSON.stringify(funnel));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe("Invalid funnel format");
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
