import React, { useState } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";

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
        <div className="w-6 h-6 bg-pink-50 border border-gray-200 rounded" />
        <div className="w-6 h-6 bg-pink-100 border border-gray-200 rounded" />
        <div className="w-6 h-6 bg-pink-200 border border-gray-200 rounded" />
        <div className="w-6 h-6 bg-pink-300 border border-gray-200 rounded" />
        <span className="text-gray-600 text-sm">Autofill</span>
      </div>
    )
  },
  "Malaga", "Siquijor", "Kent"
].map(item => typeof item === 'string' ? { name: item } : item);

const CollectionHeader: React.FC<{ 
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
  showInfo?: boolean;
}> = ({ title, isOpen, onClick, showInfo = false }) => (
  <button 
    onClick={onClick}
    className="flex items-center text-[#191919] text-lg font-bold break-words w-full ml-7"
  >
    <span>{title}</span>
    {showInfo && (
      <div className="ml-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
        <span className="text-white text-xs">1</span>
      </div>
    )}
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
      <ChevronRight className="h-4 w-4 transition-transform duration-200" />
    )}
  </div>
);

const LocationItem: React.FC<{ item: LocationItem }> = ({ item }) => (
  <div>
    <div className="flex items-center py-1 text-gray-700">
      <IconContainer isOpen={item.isExpanded} />
      <span className={item.isExpanded ? "text-amber-500" : ""}>
        {item.name}
      </span>
    </div>
    {item.isExpanded && item.subItems}
  </div>
);

const CollectionOptions: React.FC = () => {
  const [isPickCollectionOpen, setIsPickCollectionOpen] = useState(true);
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);

  return (
    <div className="w-64 p-4">
      <div className="space-y-4">
        <div>
          <CollectionHeader 
            title="Pick Collection" 
            isOpen={isPickCollectionOpen}
            onClick={() => setIsPickCollectionOpen(!isPickCollectionOpen)}
            showInfo={true}
          />
          {isPickCollectionOpen && (
            <div className="mt-2 ml-4 space-y-1">
              {locations.map((location, index) => (
                <LocationItem key={index} item={location} />
              ))}
            </div>
          )}
        </div>
        
        <CollectionHeader 
          title="See All" 
          isOpen={isSeeAllOpen}
          onClick={() => setIsSeeAllOpen(!isSeeAllOpen)}
        />
      </div>
    </div>
  );
};

export default CollectionOptions;
