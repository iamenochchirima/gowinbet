import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { TbClockHour10Filled } from "react-icons/tb";

type Option = {
  value: string;
  label: string;
};

type SelectMenuProps = {
  options: Option[];
  defaultOption: Option;
  bgColor?: string;
  borderColor?: string;
  dropdownBgColor?: string;
  icon?: React.ReactNode;
  position: string;
};

const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  defaultOption,
  bgColor = "bg-primary",
  borderColor = "border-primary",
  dropdownBgColor = "bg-gray-700",
  icon = <TbClockHour10Filled />,
    position = "left-0",
}) => {
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div className="w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className={`inline-flex text-nowrap text-white w-full justify-center gap-x-1 items-center border rounded 2xl:rounded-xl ${bgColor} ${borderColor} px-1 py-2 2xl:text-xs  shadow-sm hover:opacity-80`}
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
        <span className="ss:block hidden">
        {icon}
        </span>
          <div className="flex items-center gap-1 ss:gap-2">
            {selectedOption.label}
            <FaAngleDown
              className={`-mr-1 transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className={`absolute ${position} z-10 mt-2 w-56 origin-top-right rounded-md ${dropdownBgColor} shadow-lg ring-1 ring-black/5 focus:outline-none`}
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
  );
};

export default SelectMenu;
