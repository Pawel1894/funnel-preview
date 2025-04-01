import { describe, it, expect } from "vitest";
import { PageSchema, FunnelSchema } from "./funnel";

describe("PageSchema", () => {
  it("should validate when all block IDs are unique", () => {
    const validPage = {
      id: "page1",
      blocks: [
        { id: "block1", type: "text", text: "Hello" },
        { id: "block2", type: "image", src: "image.jpg" },
      ],
    };
    expect(() => PageSchema.parse(validPage)).not.toThrow();
  });

  it("should throw error when block IDs are not unique", () => {
    const invalidPage = {
      id: "page1",
      blocks: [
        { id: "block1", type: "text", text: "Hello" },
        { id: "block1", type: "image", src: "image.jpg" },
      ],
    };
    expect(() => PageSchema.parse(invalidPage)).toThrow("All blocks within a page must have unique IDs");
  });
});

describe("FunnelSchema", () => {
  it("should validate when all page IDs are unique", () => {
    const validFunnel = {
      name: "Test Funnel",
      bgColor: "#F5F5F5",
      pages: [
        { id: "page1", blocks: [] },
        { id: "page2", blocks: [] },
      ],
    };
    expect(() => FunnelSchema.parse(validFunnel)).not.toThrow();
  });

  it("should throw error when page IDs are not unique", () => {
    const invalidFunnel = {
      name: "Test Funnel",
      bgColor: "#F5F5F5",
      pages: [
        { id: "page1", blocks: [] },
        { id: "page1", blocks: [] },
      ],
    };
    expect(() => FunnelSchema.parse(invalidFunnel)).toThrow("All pages must have unique IDs");
  });
}); 