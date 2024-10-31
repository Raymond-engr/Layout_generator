// layoutOptions.ts
import React from "react";

interface LocationItem {
  name: string;
  isExpanded?: boolean;
  subItems?: React.ReactNode;
}

const locations: LocationItem[] = [
  { 
    name: "Hanoi",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Hanoi sub-items...</div>
  },
  { 
    name: "Caclaques",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Caclaques sub-items...</div>
  },
  { 
    name: "Reykjavik",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Reykjavik sub-items...</div>
  },
  { 
    name: "Onda",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Onda sub-items...</div>
  },
  { 
    name: "Amphora",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Amphora sub-items...</div>
  },
  { 
    name: "Penang",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Penang sub-items...</div>
  },
  { 
    name: "Madera",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Madera sub-items...</div>
  },
  { 
    name: "Malfa",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Malfa sub-items...</div>
  },
  { 
    name: "Posidonia",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Posidonia sub-items...</div>
  },
  { 
    name: "Rio",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Rio sub-items...</div>
  },
  { 
    name: "Plain",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Plain sub-items...</div>
  },
  { 
    name: "Lisboa",
    isExpanded: false,
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
  { 
    name: "Malaga",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Malaga sub-items...</div>
  },
  { 
    name: "Siquijor",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Siquijor sub-items...</div>
  },
  { 
    name: "Kent",
    isExpanded: false,
    subItems: <div className="pl-4 py-2">Kent sub-items...</div>
  }
];

export default locations;
export type { LocationItem };