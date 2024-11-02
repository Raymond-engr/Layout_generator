import React from 'react';

const UnitToggle: React.FC = () => {
  return (
    <div className="relative w-[130px] h-[39px]">
      <div className="absolute w-[133px] h-[39px] left-[-3px] top-0">
        <div className="absolute w-[130px] h-[35px] left-[3px] top-[2px] bg-[#fbfbfb] rounded-[60px] border border-[#e7e7e7]" />
        <div className="absolute w-[75px] h-[39px] left-0 top-0 bg-[#2f3825] rounded-[60px] shadow-inner border border-[#4f5e3c]" />
      </div>

      {/* Labels */}
      <div className="absolute left-[24px] top-[12px] text-white text-sm font-semibold font-nohemi">cm</div>
      <div className="absolute left-[93px] top-[12px] text-[#303825] text-sm font-medium font-nohemi">in</div>
    </div>
  );
};

export default UnitToggle;
