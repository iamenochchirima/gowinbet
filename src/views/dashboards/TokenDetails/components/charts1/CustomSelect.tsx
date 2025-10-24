import { useEffect, useRef, useState } from "react";


interface CustomSelectProps {
  options: { value: string; label: string }[];
  defaultOption: { value: string; label: string };
  bgColor: string;
  borderColor: string;
  dropdownBgColor: string;
  position: string;
  icon: React.ReactElement;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption,
  bgColor,
  borderColor,
  dropdownBgColor,
  position,
  icon,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`${bgColor} ${borderColor} flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white hover:bg-gray-600 transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span>{selectedOption.label}</span>
      </button>
      {isOpen && (
        <div
          className={`${dropdownBgColor} absolute ${position} mt-2 rounded-md shadow-lg z-10 border ${borderColor}`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full text-left px-3 py-1 text-sm text-white hover:bg-gray-600 transition-colors"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
