import React, { useState } from "react";
import locations, { LocationItem } from "./LayoutOptions";
import ArrowUp from '../assets/icons/arrow-up.svg';
import Arrowdown from '../assets/icons/itemArrowdown.svg';
import Arrowright from '../assets/icons/itemArrow_right.svg';

const CollectionHeader: React.FC<{ 
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
}> = ({ title, isOpen, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center text-[#191919] text-lg lg:text-lg font-bold font-mermaid break-words whitespace-nowrap"
  >
    <span>{title}</span>
    {onClick && (
      <div className="w-5 h-5 relative ml-2">
        {isOpen ? (
          <img className="transition-transform duration-200 filter invert-0 brightness-0" src={ArrowUp} alt="ArrowUp" />
        ) : (
          <img className="transition-transform duration-200 transform rotate-180 invert-0 brightness-0" src={ArrowUp} alt="ArrowUp" />
        )}
      </div>
    )}
  </button>
);

const LocationItemComponent: React.FC<{ item: LocationItem; onToggle: () => void }> = ({ item, onToggle }) => (
  <div>
    <div className="flex items-center py-1 text-black font-normal font-nohemi text-sm cursor-pointer" onClick={onToggle}>
      <div className="w-5 h-5 relative mt-0.5 mr-2">
        {item.isExpanded ? (
          <img className="transition-transform duration-200 transform invert-0 brightness-0" src={Arrowdown} alt="Arrowdown" />
        ) : (
          <img className="transition-transform duration-200 transform invert-0 brightness-0" src={Arrowright} alt="Arrowright" />
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
        <div className="flex flex-row gap-5 ml-8 lg:ml-0 lg:flex-col md:flex-row md:items-center md:gap-6">
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
          <div className="mt-1 ml-8 space-y-1">
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