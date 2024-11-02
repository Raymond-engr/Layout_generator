import React, { useState } from 'react';

const DimensionSelector: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState('9x9');

  const handleClick = (dimension: string) => {
    setSelectedDimension(dimension);
    console.log(`${dimension} cm selected`);
  };

  return (
    <div
      className="w-[244px] h-[39px] relative mt-4 ml-11 cursor-pointer"
      onClick={(e) => {
        const containerRect = e.currentTarget.getBoundingClientRect();
        const clickPosition = e.clientX - containerRect.left;

        if (clickPosition < 100) {
          handleClick('9x9');
        } else {
          handleClick('13x13');
        }
      }}
    >
      <div className="w-[250px] h-[39px] left-[-5px] top-0 absolute">
        <div className="w-[244px] h-[35px] left-[6px] top-[2px] absolute bg-[#fbfbfb] rounded-[60px] border border-[#e7e7e7]" />
        
      
        <div
          className={`h-[39px] left-0 top-0 absolute rounded-[60px] shadow-inner border ${
            selectedDimension === '9x9'
              ? 'w-[100px] bg-[#cd953f] border-[4px] border-[#e0b37a] left-0'
              : 'w-[150px] bg-[#cd953f] border border-[#ca9a51] left-[100px]'
          }`}
        />
      </div>

      <div
        className={`absolute left-[24px] top-[12px] text-sm font-semibold font-nohemi ${
          selectedDimension === '9x9' ? 'text-white' : 'text-[#303825]'
        }`}
      >
        9x9 cm
      </div>
      
      <div
        className={`absolute left-[130px] top-[12px] text-sm font-semibold font-nohemi ${
          selectedDimension === '13x13' ? 'text-white' : 'text-[#303825]'
        }`}
      >
        13.5x13.5 cm
      </div>
    </div>
  );
};

export default DimensionSelector;