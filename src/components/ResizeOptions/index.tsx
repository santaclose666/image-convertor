import React, { ChangeEvent, useState } from "react";
import TabsOptions from "./TabsOptions";
import { PencilRuler, Percent, Scaling } from "lucide-react";
import { Tab } from "@/models/Tabs.model";
import PercentageResize from "./PercentageResize";
import DimensionResize from "./DimensionResize";
import Loading from "../Common/Loading";

interface ImageOptionProps {
  format: string;
  display: boolean;
  onSubmitImgs: () => void;
  onFormatChange: (s: string) => void;
  onRatioChange: (ratio: number) => void;
  onSizeChange: (size: string, isWChange: boolean) => void;
}

const formatSupport: string[] = ["Original", "JPG", "PNG", "WEBP", "AVIF"];

function ImageOption(props: ImageOptionProps) {
  const {
    format,
    display,
    onSubmitImgs,
    onSizeChange,
    onRatioChange,
    onFormatChange,
  } = props;
  const [ratio, setRatio] = useState<number>(100);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const tabsData: Tab[] = [
    {
      id: 1,
      label: "Dimension",
      icon: <PencilRuler size={20} />,
      content: (
        <DimensionResize
          onResize={(size: string, isWChange: boolean) => {
            onSizeChange(size, isWChange);

            if (ratio != 1) {
              setRatio(1);
            }
          }}
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
          onRatioChange={(num: number) => {
            onRatioChange(num);
            setRatio(num);
          }}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    setIsFetching(true);

    try {
      await onSubmitImgs();
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div
      className={`h-full ml-8 transition-all duration-500 ${
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
          disabled={isFetching}
          onClick={handleSubmit}
          className="flex items-center justify-center mt-auto bg-sky-400 text-white text-2xl font-semibold px-4 py-3 rounded-lg shadow hover:bg-sky-500 transition"
        >
          {isFetching ? "Processing Images" : "Resize Images"}{" "}
          {isFetching ? (
            <Loading className="ml-2" />
          ) : (
            <Scaling className="ml-2" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ImageOption;
