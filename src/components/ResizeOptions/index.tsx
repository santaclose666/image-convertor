import React from "react";
import TabsOptions from "./TabsOptions";
import { PencilRuler, Percent } from "lucide-react";
import { Tab } from "@/models/Tabs.model";
import PercentageResize from "./PercentageResize";
import DimensionResize from "./DimensionResize";

interface ImageOptionProps {
  lockRatio: boolean;
  display: boolean;
  ratio: number;
  onRatioChange: (ratio: number) => void;
  onSizeChange: (size: string, isWChange: boolean) => void;
  onLockRatio: () => void;
}

function ImageOption(props: ImageOptionProps) {
  const {
    lockRatio,
    display = false,
    ratio,
    onRatioChange,
    onSizeChange,
    onLockRatio,
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
        className={`border-2 border-sky-300 break-words p-4 overflow-hidden bg-white rounded-3xl h-full max-h-full shadow-2xl transform transition-transform duration-500 ${
          display ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-sky-500 text-center font-medium text-2xl mb-3">
          Resize Options
        </h2>

        <TabsOptions tabs={tabsData} />
      </div>
    </div>
  );
}

export default ImageOption;
