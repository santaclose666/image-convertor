import { Tab } from "@/models/Tabs.model";
import React, { useState } from "react";

interface TabsOptionsProps {
  tabs: Tab[];
}

const TabsOptions = ({ tabs }: TabsOptionsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col gap-4 relative max-[1200px]:flex-row">
      <div
        className="flex item-center justify-evenly border rounded-xl bg-sky-400 p-1 shadow-lg relative
        max-[1200px]:flex-col
      "
      >
        {tabs.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`relative flex items-center justify-center text-lg w-full font-medium py-2 rounded-lg transition-all duration-200 ease-in-out ${
              activeTab === id ? "bg-white text-black" : "text-white"
            } max-[1360px]:text-sm max-[1200px]:h-full max-[1200px]:flex-col`}
          >
            {icon && icon}
            {label}
          </button>
        ))}
      </div>

      <div
        className={`transition-opacity duration-200 ${
          activeTab ? "opacity-100" : "opacity-0"
        }`}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabsOptions;
