/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line jsx-a11y/alt-text
import { Image, ImageUp } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropImgsProps {
  onDropImgs: (f: File[]) => void;
}

function DropImgs({ onDropImgs }: DropImgsProps) {
  const onDrop = useCallback((files: File[]) => {
    onDropImgs(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`h-4/5 flex flex-col justify-center items-center border-2 border-dashed border-gray-500 p-4 rounded-xl ${
        isDragActive ? "bg-opacity-60" : "bg-opacity-10"
      } bg-gray-200 shadow-inner`}
    >
      <input {...getInputProps()} type="file" accept="image/*" multiple />

      {isDragActive ? (
        <ImageUp className="w-36 h-36 mb-6" color="#36a8d1" />
      ) : (
        <Image className="w-36 h-36 mb-6" color="#36a8d1" />
      )}

      <p className="text-xl text-slate-500">
        {isDragActive
          ? "Release to drop images here"
          : "Select images above or drag and drop images here"}
      </p>
    </div>
  );
}

export default DropImgs;
