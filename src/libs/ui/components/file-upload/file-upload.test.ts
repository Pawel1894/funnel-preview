import { mimeToFileExtension, validateFileType } from "./file-upload";

describe("file-upload", () => {
  describe("validateFileType", () => {
    it.each([
      ["image/jpeg", true],
      ["application/pdf", true],
      ["text/plain", true],
    ])("should accept %s when acceptedTypes is '*/*'", (fileType, expected) => {
      expect(validateFileType(fileType, "*/*")).toBe(expected);
    });

    it.each([
      ["image/jpeg", "image/jpeg", true],
      ["image/jpeg", "image/png,image/jpeg", true],
      ["application/pdf", "image/jpeg,application/pdf", true],
    ])("should validate %s correctly when acceptedTypes is %s", (fileType, acceptedTypes, expected) => {
      expect(validateFileType(fileType, acceptedTypes)).toBe(expected);
    });

    it.each([
      ["image/jpeg", "image/png", false],
      ["application/pdf", "image/jpeg,image/gif", false],
      ["text/plain", "application/json", false],
    ])("should reject %s when acceptedTypes are %s", (fileType, acceptedTypes, expected) => {
      expect(validateFileType(fileType, acceptedTypes)).toBe(expected);
    });
  });

  // Note: These are discovery tests as mimeToFileExtension is from the mime-types library
  describe("mimeToFileExtension", () => {
    it.each([
      ["image/jpeg", "jpg"],
      ["image/png", "png"],
      ["application/pdf", "pdf"],
      ["text/plain", "txt"],
      ["text/html", "html"],
      ["application/javascript", "js"],
    ])("should return %s extension for MIME type %s", (mimeType, expectedExtension) => {
      expect(mimeToFileExtension(mimeType)).toBe(expectedExtension);
    });

    it("should return false for unknown MIME types", () => {
      expect(mimeToFileExtension("image/jpg")).toBe(false);
    });
  });
});
