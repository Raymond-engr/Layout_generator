import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface LocationItem {
  name: string;
  isExpanded?: boolean;
  subItems?: React.ReactNode;
}

const locations: LocationItem[] = [
  "Hanoi", "Caclaques", "Reykjavik", "Onda", "Amphora",
  "Penang", "Madera", "Malfa", "Posidonia", "Rio", "Plain",
  {
    name: "Lisboa",
    isExpanded: true,
    subItems: (
      <div className="pl-4 py-2 flex gap-2">
        <div className="w-6 h-6 bg-[#fff5ef] border border-[#7a4315] rounded-full" />
        <div className="w-6 h-6 bg-[#eff7d6] border border-[#7a4315]/30 rounded-full" />
        <div className="w-6 h-6 bg-[#ffe9cf] border border-[#7a4315]/30 rounded-full" />
        <div className="w-6 h-6 bg-pink-300 border border-gray-200 rounded" />
        <span className="text-black text-xs font-light font-['Nohemi'] underline">Autofill</span>
      </div>
    )
  },
  "Malaga", "Siquijor", "Kent"
].map(item => typeof item === 'string' ? { name: item } : item);

const CollectionHeader: React.FC<{
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
}> = ({ title, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center text-[#191919] text-lg font-bold font-['Mermaid'] break-words whitespace-nowrap"
  >
    <span>{title}</span>
    {onClick && (
      <IconContainer isOpen={isOpen} />
    )}
  </button>
);

const IconContainer: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
  <div className="w-5 h-5 relative">
    {isOpen ? (
      <ChevronDown className="h-4 w-4 transition-transform duration-200 transform rotate-180" />
    ) : (
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    )}
  </div>
);

const LocationItem: React.FC<{ item: LocationItem }> = ({ item }) => (
  <div>
    <div className="flex items-center py-1 text-black text-sm font-normal font-['Nohemi']">
      <IconContainer isOpen={item.isExpanded} />
      <span className={item.isExpanded ? "text-amber-500" : ""}>
        {item.name}
      </span>
    </div>
    {item.isExpanded && item.subItems}
  </div>
);

const CollectionOptions: React.FC = () => {
  const [isPickCollectionOpen, setIsPickCollectionOpen] = useState(false);
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);

  return (
    <div className="w-64 p-4 flex flex-col lg:flex-row gap-4">
      <div className="space-y-4">
        <div className="flex sm:items-center flex-row lg:flex-col md:flex-row md:items-center md:gap-4">
          <CollectionHeader
            title="Pick Collection"
            isOpen={isPickCollectionOpen}
            onClick={() => setIsPickCollectionOpen(!isPickCollectionOpen)}
          />
          <CollectionHeader
            title="See All"
            isOpen={isSeeAllOpen}
            onClick={() => setIsSeeAllOpen(!isSeeAllOpen)}
          />
        </div>

        {/* Pick Collection Subitems */}
        {isPickCollectionOpen && (
          <div className="mt-2 ml-4 space-y-1">
            {locations.map((location, index) => (
              <LocationItem key={index} item={location} />
            ))}
          </div>
        )}

        {/* See All Subitems */}
        {isSeeAllOpen && (
          <div className="mt-2 ml-4 space-y-1">
            {/* Replace these with actual "See All" items */}
            {["Item1", "Item2", "Item3", "Item4"].map((item, index) => (
              <LocationItem key={index} item={{ name: item }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionOptions;