import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { TbClockHour10Filled } from "react-icons/tb";

type Option = {
    value: string;
    label: string;
  };

const SelectMenuTable = () => {
    const [selectedOption, setSelectedOption] = useState<Option>({ value: "24H", label: "Last 24 hours"});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options: Option[] = [
        { value: "24H", label: "Last 24 hours"},
        { value: "7D", label: "Last 7 days"},
        { value: "1M", label: "Last 1 month"},
        { value: "3M", label: "Last 3 months"},
        { value: "6M", label: "Last 6 months"},
        { value: "1Y", label: "Last 1 year"},
        { value: "ALL", label: "All time" },
      ];
    
      const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    
      const handleOptionSelect = (opt: Option) => {
        setSelectedOption(opt);
        setIsDropdownOpen(false); 
      };
    
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex text-white text-xs w-full justify-center gap-x-1 items-center rounded-2xl bg-primary px-4 py-2.5 xs:text-sm font-semibold  shadow-sm hover:bg-primary-mild"
        id="menu-button"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
     <TbClockHour10Filled className="text-white" />
      <div className="flex items-center gap-1 xs2:gap-7">
      {selectedOption.label}
        <FaAngleDown className={`-mr-1  text-white transform ${isDropdownOpen ? "rotate-180" : ""}`} />
      </div>
      </button>

    </div>


    {isDropdownOpen && (
      <div
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black/5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 cursor-pointer"
              role="menuitem"
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  )
}

export default SelectMenuTable