import { useState, useCallback } from "react";
import { FileUp, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export function FileUpload({ onFileSelect, selectedFile, onClear }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.[0]?.type === "application/pdf") {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  if (selectedFile) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
        <FileUp className="h-5 w-5 text-primary shrink-0" />
        <span className="text-sm font-medium truncate flex-1">{selectedFile.name}</span>
        <span className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(0)} KB</span>
        <button onClick={onClear} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <label
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-200 ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <div className="rounded-full bg-primary/10 p-3">
        <FileUp className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Drop your resume here or click to browse</p>
        <p className="text-xs text-muted-foreground mt-1">PDF files only</p>
      </div>
      <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" />
    </label>
  );
}
