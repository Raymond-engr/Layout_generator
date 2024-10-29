import React from 'react';

const DimensionInput = ({ label }: { label: string }) => {
  return(
  <div className="flex flex-col items-center">
    <label className="text-[#cc9c53] font-normal font-[Nohemi]">{label}</label>
    <div className="w-[110px] h-[37px] bg-[#fbfbfb] rounded-[46px] border border-[#e7e7e7] flex items-center justify-center">
      <span className="text-black text-sm font-normal font-[Nohemi]">--</span>
    </div>
  </div>
);
};
const DimensionSelector = () => {
  return(
  <div className="flex gap-4 mt-10 ml-20">
    <DimensionInput label="Height" />
    <DimensionInput label="Width" />
  </div>
);
};

export default DimensionSelector;
