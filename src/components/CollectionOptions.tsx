import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import locations, { LocationItem } from "./LayoutOptions";

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
      <div className="w-5 h-5 relative ml-1">
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform duration-200 transform rotate-180" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        )}
      </div>
    )}
  </button>
);

const LocationItemComponent: React.FC<{ item: LocationItem; onToggle: () => void }> = ({ item, onToggle }) => (
  <div>
    <div className="flex items-center py-1 text-black font-normal font-['Nohemi'] text-sm cursor-pointer" onClick={onToggle}>
      <div className="w-5 h-5 relative mr-2">
        {item.isExpanded ? (
          <ChevronDown className="h-4 w-4 transition-transform" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform" />
        )}
      </div>
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
  const [expandedLocations, setExpandedLocations] = useState<{ [key: string]: boolean }>({});

  const toggleLocation = (name: string) => {
    setExpandedLocations(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="w-64 p-4">
      <div className="space-y-4">
        <div className="flex flex-row lg:flex-col md:flex-row md:items-center md:gap-4">
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

        {isPickCollectionOpen && (
          <div className="mt-2 ml-4 space-y-1">
            {locations.map((location) => (
              <LocationItemComponent 
                key={location.name} 
                item={{ ...location, isExpanded: expandedLocations[location.name] }}
                onToggle={() => toggleLocation(location.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionOptions;