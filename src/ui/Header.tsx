import React from 'react';
import logo from '../assets/icons/logo.svg';
import mobilelogo from '../assets/icons/partial_logo.svg';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 md:px-6 md:py-4">
      <div className="hidden md:flex items-center justify-between w-full">
        <img className="w-56 h-12" src={logo} alt="Logo" />
        <div className="text-3xl font-bold font-mermaid">
          <span className="text-[#191919]">Layout </span>
          <span className="text-[#cb9b52]">Designer</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:hidden">
        <img className="w-[31px] h-[39px]" src={mobilelogo} alt="Logo" />

        <div className="text-xl font-bold">
          <span className="text-[#191919] font-['Mermaid']">Layout </span>
          <span className="text-[#cb9b52] font-['Mermaid']">Designer</span>
        </div>

        <div className="w-[5px] h-[21px] flex flex-col justify-between items-center">
          <div className="w-[5px] h-[5px] bg-[#191919] rounded-full" />
          <div className="w-[5px] h-[5px] bg-[#191919] rounded-full" />
          <div className="w-[5px] h-[5px] bg-[#191919] rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;
