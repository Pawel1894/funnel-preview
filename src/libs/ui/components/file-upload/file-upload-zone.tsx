"use client";

import { useRef, useState } from "react";
import { cva } from "class-variance-authority";

import { Banner, Button, UploadIcon } from "@/libs/ui";

import { validateFileType, mimeToFileExtension } from "./file-upload";
import { twMerge } from "tailwind-merge";

export type FileUploadProps = {
  title: string;
  description: string;
  onFileSelected?: (file: File) => void;
  acceptedFileTypes?: string;
  disabled?: boolean;
  className?: string;
  onDragOver?: (e: React.DragEvent) => void;
  onDialogOpen?: () => void;
};

const uploadAreaVariants = cva(
  "border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-y-4 p-12 w-full h-full transition-colors",
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
      error: {
        true: "border-destructive",
        false: "border-muted",
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
  onDialogOpen,
  onDragOver,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClearError = () => {
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }

    handleClearError();

    onDragOver?.(e);
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

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleError = () => {
    const extension = mimeToFileExtension(acceptedFileTypes);

    setError(`File type not accepted. Please upload ${extension !== false ? extension : acceptedFileTypes}`);

    handleResetFileInput();
  };

  const handleSelection = (file: File) => {
    onFileSelected?.(file);

    handleResetFileInput();
  };

  const handleFileUpload = (file: File) => {
    if (!validateFileType(file.type, acceptedFileTypes)) {
      handleError();

      return;
    }

    handleSelection(file);
  };

  const handleOpenFileDialog = () => {
    handleClearError();

    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }

    onDialogOpen?.();
  };

  return (
    <div className={twMerge("flex flex-col items-center gap-y-4", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${twMerge(uploadAreaVariants({ isDragging, disabled, error: !!error }))}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          disabled={disabled}
          data-testid="file-upload-input"
        />
        <UploadIcon className="size-14 text-muted-foreground" />
        <h2 className="text-2xl font-semibold text-center">{title}</h2>
        <p className="text-center text-muted-foreground md:px-8 max-w-lg">{description}</p>
        <Button onClick={handleOpenFileDialog} variant="primary">
          Select file
        </Button>
      </div>
      {error && (
        <Banner variant="error" title="Error">
          {error}
        </Banner>
      )}
    </div>
  );
}
