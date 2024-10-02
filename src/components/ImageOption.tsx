import React from "react";

interface ImageOptionProps {
  display: boolean;
}

function ImageOption(props: ImageOptionProps) {
  const { display = false } = props;

  return (
    <div
      className={`w-${
        display ? "1/4" : "0"
      } h-full p-5 transition-opacity duration-500 ${
        display ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-3xl h-full shadow-2xl transform transition-transform duration-500 ${
          display ? "translate-x-0" : "translate-x-full"
        }`}
      ></div>
    </div>
  );
}

export default ImageOption;
