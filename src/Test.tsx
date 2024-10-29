import React from 'react';

function Test() {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center">
      <Header />
      <div className="relative w-[1512px] h-[982px]">
        <DimensionSelector />
        <CollectionPicker />
        <TileGrid />
        <TotalDisplay />
        <ActionButtonGroup />
      </div>
    </div>
  );
}

// 1. Header Component
const Header = () => (
  <header className="flex justify-between items-center mt-5 mx-20">
    <img className="w-56 h-12" src="https://via.placeholder.com/224x48" alt="Logo" />
    <h1 className="text-3xl font-bold">
      <span className="text-[#191919]">Layout </span>
      <span className="text-[#cb9b52]">Designer</span>
    </h1>
  </header>
);

// 2. Dimension Selector
const DimensionSelector = () => (
  <div className="flex gap-4 mt-10 ml-20">
    <DimensionInput label="Height" />
    <DimensionInput label="Width" />
    <UnitToggle />
  </div>
);

const DimensionInput = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center">
    <label className="text-[#cc9c53] font-medium">{label}</label>
    <div className="w-[110px] h-[37px] bg-[#fbfbfb] rounded-full border border-[#e7e7e7] flex items-center justify-center">
      <span className="text-black">--</span>
    </div>
  </div>
);

const UnitToggle = () => (
  <div className="flex items-center">
    <div className="bg-[#2f3825] text-white rounded-full p-2 cursor-pointer">cm</div>
    <div className="text-[#303825] p-2">in</div>
  </div>
);

// 3. Collection Picker
const CollectionPicker = () => (
  <div className="flex flex-col mt-5 ml-20">
    <h2 className="text-lg font-bold text-[#191919]">Pick Collection</h2>
    <button className="text-lg font-bold text-[#191919] mt-2">See All</button>
  </div>
);

// 4. Tile Grid
const TileGrid = () => (
  <div className="mt-10 mx-auto w-[889px] h-[509px] bg-neutral-50 rounded-sm">
    <p className="text-center text-[#606060] mt-[50%]">Please choose a tile model</p>
  </div>
);

// 5. Action Button Group
const ActionButtonGroup = () => (
  <div className="flex gap-6 mt-10 ml-[30%]">
    {['Randomize', 'Rotate All', 'Save Layout', 'Add to Cart'].map((label, index) => (
      <ActionButton key={index} label={label} isPrimary={label === 'Add to Cart'} />
    ))}
  </div>
);

const ActionButton = ({ label, isPrimary }: { label: string; isPrimary?: boolean }) => (
  <button
    className={`px-4 py-2 rounded-full border ${isPrimary ? 'bg-[#f6e2c4]' : 'opacity-50'}`}
  >
    {label}
  </button>
);

// 6. Total Display
const TotalDisplay = () => (
  <div className="flex justify-end items-center mr-20 mt-10">
    <span className="text-base font-medium mr-2">TOTAL:</span>
    <span className="text-base font-medium">--</span>
  </div>
);

export default Test;
