import React, { ChangeEvent } from "react";
import TabsOptions from "./TabsOptions";
import { PencilRuler, Percent, Scaling } from "lucide-react";
import { Tab } from "@/models/Tabs.model";
import PercentageResize from "./PercentageResize";
import DimensionResize from "./DimensionResize";

interface ImageOptionProps {
  ratio: number;
  format: string;
  display: boolean;
  lockRatio: boolean;
  onLockRatio: () => void;
  onSubmitImgs: () => void;
  onFormatChange: (s: string) => void;
  onRatioChange: (ratio: number) => void;
  onSizeChange: (size: string, isWChange: boolean) => void;
}

const formatSupport: string[] = ["Original", "JPG", "PNG", "WEBP", "AVIF"];

function ImageOption(props: ImageOptionProps) {
  const {
    ratio,
    format,
    display,
    lockRatio,
    onLockRatio,
    onSubmitImgs,
    onSizeChange,
    onRatioChange,
    onFormatChange,
  } = props;
  const tabsData: Tab[] = [
    {
      id: 1,
      label: "Dimension",
      icon: <PencilRuler size={20} />,
      content: (
        <DimensionResize
          lockRatio={lockRatio}
          onResize={onSizeChange}
          onLockRatio={onLockRatio}
        />
      ),
    },
    {
      id: 2,
      label: "Percentage",
      icon: <Percent size={20} />,
      content: (
        <PercentageResize
          value={ratio}
          maxRange={200}
          onRatioChange={onRatioChange}
        />
      ),
    },
  ];

  return (
    <div
      className={`h-full ms-6 transition-all duration-500 ${
        display ? "w-1/4 opacity-100 flex-grow min-w-64" : "opacity-0 w-0"
      }`}
    >
      <div
        className={`border-2 border-sky-300 break-words p-4 overflow-hidden bg-white rounded-3xl h-full max-h-full shadow-2xl flex flex-col transform transition-transform duration-500 ${
          display ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-sky-500 text-center font-medium text-2xl mb-3">
          Resize Options
        </h2>

        <TabsOptions tabs={tabsData} />

        <div className="flex flex-col mt-4">
          <label className="text-sky-500 mb-2">Save Image As</label>
          <select
            value={format}
            defaultValue={formatSupport[0]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              onFormatChange(e.target.value)
            }
            className="text-lg border text-sky-500 border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-400 transition duration-200 ease-in-out"
          >
            {formatSupport.map((item) => {
              return (
                <option
                  key={item}
                  value={item}
                  className="text-sky-500 bg-white hover:bg-sky-100 cursor-pointer text-lg"
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={onSubmitImgs}
          className="flex items-center justify-center mt-auto bg-sky-400 text-white text-2xl font-semibold px-4 py-2 rounded-lg shadow hover:bg-sky-500 transition"
        >
          Resize Images <Scaling className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default ImageOption;
