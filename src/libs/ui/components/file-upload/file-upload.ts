import { extension } from "mime-types";

export const mimeToFileExtension = extension;

export function validateFileType(fileType: string, acceptedTypes: string): boolean {
  if (acceptedTypes === "*/*") return true;

  const fileTypes = acceptedTypes.split(",");

  return fileTypes.includes(fileType);
}

