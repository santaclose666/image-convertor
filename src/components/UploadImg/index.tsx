import React, { ChangeEvent } from "react";

interface UploadImgProps {
  isReselect: boolean;
  onSelectedChange: (e: File[]) => void;
}

function UploadImg(props: UploadImgProps) {
  const { isReselect = false, onSelectedChange } = props;
  return (
    <div className="flex flex-col items-center justify-center h-1/5 w-[100%] text-center">
      <h1 className="text-4xl font-bold mb-4 text-sky-600 ">Upload Images</h1>
      <button className="mb-4 flex justify-center">
        <label
          htmlFor="customFileInput"
          className="border border-gray-400 cursor-pointer px-9 py-3 bg-violet-400 text-white rounded-full shadow-md hover:bg-blue-500 font-semibold"
        >
          {isReselect ? "Reselect" : "Select"}
        </label>
        <input
          id="customFileInput"
          key={`${isReselect}`}
          type="file"
          accept="image/*"
          multiple
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            onSelectedChange(files);
          }}
          className="hidden"
        />
      </button>
    </div>
  );
}

export default UploadImg;
