import React, { useState } from 'react';

const DimensionInput = ({ label }: { label: string }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div >
      <label className="text-[#cc9c53] text-sm font-normal font-nohemi">{label}</label>
      <div className="w-[110px] h-[37px] bg-[#fbfbfb] rounded-[46px] border border-[#e7e7e7] flex items-center justify-center">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className="bg-transparent text-black text-sm font-normal font-nohemi w-full h-full text-center outline-[1px] rounded-[46px] pl-6 pr-6"
        />
      </div>
    </div>
  );
};

const DimensionInputs = () => {
  return (
    <div className="flex space-x-4 md:space-x-6 mt-2">
      <DimensionInput label="Height (mm)" />
      <DimensionInput label="Width (mm)" />
    </div>
  );
};

export default DimensionInputs;