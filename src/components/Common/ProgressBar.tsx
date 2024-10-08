import { floorNumber } from "@/util/number";
import React, { ChangeEvent } from "react";

export interface ProgressBarProps {
  value: number;
  minRange?: number;
  maxRange?: number;
  step?: number;
  containerClassName?: string;
  inputClassName?: string;
  textClassName?: string;
  onRatioChange: (ratio: number) => void;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    value,
    minRange = 1,
    maxRange = 100,
    step = 1,
    containerClassName = "",
    inputClassName = "",
    textClassName = "",
    onRatioChange,
  } = props;

  return (
    <div
      className={`flex items-center justify-between p-4 border border-zinc-200 rounded-xl gap-1 ${containerClassName}`}
    >
      <input
        type="range"
        min={minRange}
        max={maxRange}
        step={step}
        value={value}
        className={`appearance-none w-[80%] h-4 bg-gray-300 rounded-lg focus:outline-none focus:ring-none focus:ring-blue-500 bg-gradient-to-r from-cyan-300 to-blue-400 ${inputClassName}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onRatioChange(Number(e.target.value))
        }
      />

      <span className={`w-[20%] text-center text-sky-500 ${textClassName}`}>
        {floorNumber(value)}%
      </span>
    </div>
  );
}

export default ProgressBar;
