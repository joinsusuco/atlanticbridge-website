"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface UploadedFile {
  path: string;
  filename: string;
  size: number;
  token: string;
  preview?: string;
}

interface ImageUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

export default function ImageUpload({
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = useCallback(
        (file: File): string | null => {
      // Check type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return `"${file.name}" is not a supported format. Use JPG, PNG, WebP, or HEIC.`;
      }

      // Check extension
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return `"${file.name}" has an invalid extension.`;
      }

      // Check size
      if (file.size > maxSizeBytes) {
        return `"${file.name}" exceeds ${maxSizeMB}MB limit.`;
      }

      return null;
    },
    [maxSizeBytes, maxSizeMB]
  );

  const uploadFiles = useCallback(
    async (filesToUpload: File[], allPreviews: string[]) => {
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        filesToUpload.forEach((file) => {
          formData.append("files", file);
        });

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Upload failed");
        }

        // Add previews to uploaded files
        const newUploadedFiles: UploadedFile[] = result.files.map(
          (f: UploadedFile, i: number) => ({
            ...f,
            preview: allPreviews[uploadedFiles.length + i],
          })
        );

        const updatedUploaded = [...uploadedFiles, ...newUploadedFiles];
        setUploadedFiles(updatedUploaded);
        onFilesChange(updatedUploaded);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        // Remove failed files
        setFiles(files.slice(0, -filesToUpload.length));
        setPreviews(previews.slice(0, -filesToUpload.length));
      } finally {
        setIsUploading(false);
      }
    },
    [files, onFilesChange, previews, uploadedFiles]
  );

  const handleFileSelect = useCallback(
    async (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      setError(null);

      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      // Check total file count
      if (files.length + selectedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} photos allowed.`);
        return;
      }

      for (const file of Array.from(selectedFiles)) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }

        // Check for duplicates
        if (files.some((f) => f.name === file.name && f.size === file.size)) {
          continue;
        }

        newFiles.push(file);

        // Create preview
        const preview = URL.createObjectURL(file);
        newPreviews.push(preview);
      }

      if (newFiles.length === 0) return;

      const updatedFiles = [...files, ...newFiles];
      const updatedPreviews = [...previews, ...newPreviews];

      setFiles(updatedFiles);
      setPreviews(updatedPreviews);

      // Upload files
      await uploadFiles(newFiles, updatedPreviews);
    },
    [files, previews, maxFiles, uploadFiles, validateFile]
  );

  const removeFile = useCallback(
    (index: number) => {
      // Revoke preview URL
      if (previews[index]) {
        URL.revokeObjectURL(previews[index]);
      }

      const newFiles = files.filter((_, i) => i !== index);
      const newPreviews = previews.filter((_, i) => i !== index);
      const newUploaded = uploadedFiles.filter((_, i) => i !== index);

      setFiles(newFiles);
      setPreviews(newPreviews);
      setUploadedFiles(newUploaded);
      onFilesChange(newUploaded);
    },
    [files, previews, uploadedFiles, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Photos (Optional)
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Upload photos for a faster, more accurate quote. Max {maxFiles} photos, {maxSizeMB}MB each.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer touch-manipulation select-none transition-colors ${
          isUploading
            ? "border-gold/50 bg-gold/5"
            : "border-gray-300 hover:border-gold hover:bg-gold/5 active:bg-gold/10"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.heic,.heif"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading || files.length >= maxFiles}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-8 h-8 text-gold animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm text-gray-600">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <span className="text-gold font-medium">Click to upload</span>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <span className="text-xs text-gray-400">JPG, PNG, WebP, or HEIC</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 flex items-start gap-1 leading-snug">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {previews.map((preview, index) => (
            <div
              key={preview}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
            >
              <Image
                src={preview}
                alt={`Upload ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
              {/* Upload status overlay */}
              {index >= uploadedFiles.length && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                </div>
              )}
              {/* Remove button */}
              {index < uploadedFiles.length && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {/* Success indicator */}
              {index < uploadedFiles.length && (
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* File count */}
      {files.length > 0 && (
        <p className="text-xs text-gray-500">
          {uploadedFiles.length} of {maxFiles} photos uploaded
        </p>
      )}
    </div>
  );
}
