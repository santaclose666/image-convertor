import React, { useState } from "react";
import ProgressBar, { ProgressBarProps } from "../Common/ProgressBar";
import { CheckCheck } from "lucide-react";

type state = "smaller" | "larger";

interface PercentDefaultProps {
  id: number;
  value: number;
  state: state;
}

const percentDefault: PercentDefaultProps[] = [
  { id: 1, value: 25, state: "smaller" },
  { id: 2, value: 25, state: "larger" },
  { id: 3, value: 50, state: "smaller" },
  { id: 4, value: 50, state: "larger" },
  { id: 5, value: 75, state: "smaller" },
  { id: 6, value: 75, state: "larger" },
];

function PercentageResize(props: ProgressBarProps) {
  const { value, maxRange = 100, onRatioChange } = props;

  const [percentPicker, setPercentPicker] = useState<number | null>(null);

  const handlePickRatio = (id: number, value: number) => {
    setPercentPicker(id);
    onRatioChange(value);
  };

  const handleRatioChange = (value: number) => {
    onRatioChange(value);
    setPercentPicker(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-3 border-2 rounded-xl border-sky-200">
        {percentDefault.map(({ id, value, state }) => {
          const isPicker = percentPicker === id;

          return (
            <div
              key={id}
              className={`flex items-center justify-between p-2 rounded-lg border hover:cursor-pointer transition-colors duration-300 ${
                isPicker
                  ? "border-sky-400"
                  : "border-gray-200 hover:border-sky-400"
              }`}
              onClick={() =>
                handlePickRatio(id, state === "smaller" ? value : value + 100)
              }
            >
              <span
                className={`text-sm uppercase transition-colors duration-300 ${
                  isPicker ? "text-sky-400" : "text-slate-500"
                }`}
              >
                {value}% {state}
              </span>

              {isPicker && <CheckCheck size={20} className="text-sky-300" />}
            </div>
          );
        })}
      </div>

      <div className="flex items-center my-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sky-400">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <ProgressBar
        value={value}
        maxRange={maxRange}
        onRatioChange={handleRatioChange}
      />
    </div>
  );
}

export default PercentageResize;
