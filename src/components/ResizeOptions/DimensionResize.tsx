import React, { ChangeEvent, useState } from "react";

interface DimensionResizeProps {
  onResize: (size: string, isWChange: boolean) => void;
}

const DimensionResize = ({ onResize }: DimensionResizeProps) => {
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [isFocusWidth, setIsFocusWidth] = useState<boolean>(true);

  const handleResize = (size: string, isWidth: boolean) => {
    if (isWidth) {
      setWidth(size);
    } else {
      setHeight(size);
    }

    onResize(size, isWidth);
  };

  const handleFocusInput = (isWidthFocus: boolean) => {
    setIsFocusWidth(isWidthFocus);

    if (isWidthFocus) {
      setHeight("0");
    } else {
      setWidth("0");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-col w-1/2 pr-2">
          <label
            className={`text-md mb-1 font-medium ${
              isFocusWidth ? "text-sky-500" : "text-gray-300"
            } `}
          >
            Width
          </label>
          <input
            type="number"
            className={`${
              isFocusWidth ? "text-sky-500" : "text-gray-300"
            } border border-gray-400 rounded-md px-3 text-sm py-3 focus:outline-none focus:border-sky-400`}
            value={width}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleResize(e.target.value, true)
            }
            onFocus={() => handleFocusInput(true)}
          />
        </div>

        <div className="flex flex-col w-1/2 pl-2">
          <label
            className={`text-md mb-1 font-medium ${
              !isFocusWidth ? "text-sky-500" : "text-gray-300"
            } `}
          >
            Height
          </label>
          <input
            type="number"
            className={`${
              !isFocusWidth ? "text-sky-500" : "text-gray-300"
            } border border-gray-400 rounded-md px-3 text-sm py-3 focus:outline-none focus:border-sky-400`}
            value={height}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleResize(e.target.value, false)
            }
            onFocus={() => handleFocusInput(false)}
          />
        </div>
      </div>

      <div className="flex items-center text-center">
        <input
          type="checkbox"
          id="lock-aspect-ratio"
          checked={true}
          disabled
          className="w-5 h-5 mr-2 rounded border border-gray-500 focus:outline-none checked:bg-blue-600 checked:border-transparent"
        />
        <label
          className="text-sky-400 cursor-pointer"
          htmlFor="lock-aspect-ratio"
        >
          Lock Aspect Ratio
        </label>
      </div>
    </div>
  );
};

export default DimensionResize;
