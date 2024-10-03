import React from "react";

interface ImageOptionProps {
  display: boolean;
}

function ImageOption(props: ImageOptionProps) {
  const { display = false } = props;

  return (
    <div
      className={`h-full ms-6 transition-all duration-500 ${
        display ? "opacity-100 flex-grow min-w-64" : "opacity-0 w-0"
      }`}
    >
      <div
        className={`break-words overflow-hidden bg-white rounded-3xl h-full max-h-full shadow-2xl transform transition-transform duration-500 ${
          display ? "translate-x-0" : "translate-x-full"
        }`}
      >
        asdfasjfdkalsdfk;lasjfwhieufgasjkdfnlkasdfjaksdfkjahsdkfjbhaskjdf
      </div>
    </div>
  );
}

export default ImageOption;
