import React, { ChangeEvent, useState } from "react";
import TabsOptions from "./TabsOptions";
import { PencilRuler, Percent, Scaling } from "lucide-react";
import { Tab } from "@/models/Tabs.model";
import PercentageResize from "./PercentageResize";
import DimensionResize from "./DimensionResize";
import Loading from "../Common/Loading";
import { imgFormat } from "@/models/Image.model";

interface ImageOptionProps {
  format: string;
  display: boolean;
  onSubmitImgs: () => void;
  onFormatChange: (s: string) => void;
  onRatioChange: (ratio: number) => void;
  onSizeChange: (size: string, isWChange: boolean) => void;
}

const formatSupport: imgFormat[] = [
  "Original",
  "JPG",
  "PNG",
  "WEBP",
  "AVIF",
  "GIF",
  "PDF",
];

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
      className={`h-full transition-all duration-500 ${
        display ? "w-1/4 opacity-100 min-w-64" : "opacity-0 w-0"
      } max-[1200px]:w-[75%] max-[1200px]:h-1/4 max-[1200px]:min-w-[500px]`}
    >
      <div
        className={`border-2 border-sky-300 break-words p-4 gap-3 overflow-hidden bg-white rounded-3xl h-full max-h-full shadow-2xl flex flex-col transform transition-transform duration-500 ${
          display ? "translate-x-0" : "translate-x-full"
        } max-[1200px]:flex-row`}
      >
        <h2 className="text-sky-500 text-center font-medium text-2xl mb-3 max-[1200px]:hidden">
          Resize Options
        </h2>

        <TabsOptions tabs={tabsData} />

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor={"img-select"} className="text-sky-500">
              Save Image As
            </label>
            <select
              id="img-select"
              value={format.toUpperCase()}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const format = e.target.value;
                onFormatChange(format.toLowerCase());
              }}
              className="text-lg border text-sky-500 border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-400 transition duration-200 ease-in-out"
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
            className="flex items-center justify-center mt-auto bg-sky-400 text-white text-2xl font-semibold px-4 py-3 rounded-lg shadow hover:bg-sky-500 transition 
            max-[1350px]:text-xl max-[1200px]:text-lg max-[1200px]:mt-0
            "
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
    </div>
  );
}

export default ImageOption;
