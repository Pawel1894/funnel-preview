"use client";

import { useRef, useState } from "react";
import { cva } from "class-variance-authority";

import { Button, UploadIcon } from "@/libs/ui";

import { validateFileType, mimeToFileExtension } from "./file-upload";

export type FileUploadProps = {
  title: string;
  description: string;
  onFileSelected?: (file: File) => void;
  acceptedFileTypes?: string;
  disabled?: boolean;
  className?: string;
};

const uploadAreaVariants = cva(
  "border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-y-4 p-12",
  {
    variants: {
      isDragging: {
        true: "border-primary bg-primary/5",
        false: "border-muted",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      isDragging: false,
      disabled: false,
    },
  }
);

export function FileUploadZone({
  description,
  title,
  onFileSelected,
  acceptedFileTypes = "*/*",
  disabled = false,
  className = "",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearError = () => {
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }

    clearError();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files || e.target.files.length === 0) return;

    handleFileUpload(e.target.files[0]);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleError = () => {
    const extension = mimeToFileExtension(acceptedFileTypes);

    setError(`File type not accepted. Please upload ${extension !== false ? extension : acceptedFileTypes}`);

    resetFileInput();
  };

  const handleSelection = (file: File) => {
    onFileSelected?.(file);

    resetFileInput();
  };

  const handleFileUpload = (file: File) => {
    if (!validateFileType(file.type, acceptedFileTypes)) {
      handleError();

      return;
    }

    handleSelection(file);
  };

  const openFileDialog = () => {
    clearError();

    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${uploadAreaVariants({ isDragging, disabled })} ${className}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        disabled={disabled}
      />
      <UploadIcon className="size-14 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-center text-muted-foreground md:px-8 max-w-lg">{description}</p>

      <p className="text-destructive text-sm h-4">{error}</p>

      <Button onClick={openFileDialog} variant="primary" disabled={disabled}>
        Select file
      </Button>
    </div>
  );
}
