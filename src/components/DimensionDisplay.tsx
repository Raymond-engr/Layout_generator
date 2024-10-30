import React from 'react';

const DimensionDisplay: React.FC = () => {
  return (
    <div className="w-[244px] h-[39px] relative mt-4 ml-20">
      <div className="w-[250px] h-[39px] left-[-5px] top-0 absolute">
        <div className="w-[244px] h-[35px] left-[6px] top-[2px] absolute bg-[#fbfbfb] rounded-[60px] border border-[#e7e7e7]" />
        <div className="w-[113px] h-[39px] left-0 top-0 absolute bg-[#cd953f] rounded-[60px] shadow-inner border border-[#ca9a51]" />
      </div>

      <div className="left-[24px] top-[12px] absolute text-white text-sm font-semibold font-[Nohemi]">9x9 cm</div>
      <div className="left-[130px] top-[12px] absolute text-[#303825] text-sm font-medium font-[Nohemi]">13.5x13.5 cm</div>
    </div>
  );
};

export default DimensionDisplay;
