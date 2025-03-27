import React, { useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, error }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">Upload Profile Picture</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
        id="profile-upload"
      />
      <label 
        htmlFor="profile-upload" 
        className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white text-center cursor-pointer hover:bg-white/20 transition"
      >
        {fileName || "Choose a file"}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
