import React, { ChangeEvent } from "react";

interface UploadImgProps {
  isReselect: boolean;
  onSelectedChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function UploadImg(props: UploadImgProps) {
  const { isReselect = false, onSelectedChange } = props;
  return (
    <div className="flex flex-col items-center justify-center h-1/4 w-[100%] text-center">
      <h1 className="text-4xl font-bold mb-4 text-sky-400 ">Upload Images</h1>
      <div className="mb-4 flex justify-center">
        <input
          key={`${isReselect}`}
          type="file"
          accept="image/*"
          multiple
          onChange={onSelectedChange}
          className="hidden"
          id="customFileInput"
        />
        <label
          htmlFor="customFileInput"
          className="cursor-pointer px-9 py-3 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-500 font-semibold"
        >
          {isReselect ? "Reselect" : "Select"}
        </label>
      </div>
    </div>
  );
}

export default UploadImg;
