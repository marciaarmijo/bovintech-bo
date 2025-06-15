
import React from "react";

type Tab = {
  key: string;
  label: string;
};

interface TabsGSProps {
  value: string;
  onChange: (tab: string) => void;
  tabs: Tab[];
}

const TabsGS: React.FC<TabsGSProps> = ({ value, onChange, tabs }) => (
  <div className="bg-white border-b border-gray-200 px-4">
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`py-3 px-1 border-b-2 font-medium text-sm
            ${
              value === tab.key
                ? "border-[#ac815d] text-[#ac815d]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }
          `}
          style={{ minWidth: 90 }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default TabsGS;
