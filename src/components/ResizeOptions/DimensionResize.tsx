import React, { ChangeEvent, useState } from "react";

interface DimensionResizeProps {
  onResize: (size: string, isWChange: boolean) => void;
}

const DimensionResize = ({ onResize }: DimensionResizeProps) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
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
      setHeight("");
    } else {
      setWidth("");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between w-full max-[1360px]:flex-col">
        <div className="flex flex-col w-[46%] max-[1360px]:w-full">
          <label
            htmlFor={"inputW"}
            className={`text-md font-medium ${
              isFocusWidth ? "text-sky-500" : "text-gray-300"
            }`}
          >
            Width
          </label>
          <input
            id="inputW"
            type="number"
            min={6}
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

        <div className="flex flex-col w-[46%] max-[1360px]:w-full">
          <label
            htmlFor={"inputH"}
            className={`text-md font-medium ${
              !isFocusWidth ? "text-sky-500" : "text-gray-300"
            } `}
          >
            Height
          </label>
          <input
            id="inputH"
            type="number"
            min={6}
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
