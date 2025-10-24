import { useEffect, useRef, useState } from "react";

const SelectMenu = () => {
  const [selectedOption, setSelectedOption] = useState("Ethereum");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "Ethereum", label: "Ethereum", icon: "/img/coins/eth.png" },
    { value: "Bitcoin", label: "Bitcoin", icon: "/img/coins/btc.png" },
    { value: "Solana", label: "Solana", icon: "/img/coins/sol.png" },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setIsDropdownOpen(false); // Close dropdown after selection
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
    <div className="relative w-full sm:max-w-[180px] inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex w-full  gap-x-2 items-center rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <img
            src={options.find((option) => option.value === selectedOption)?.icon}
            alt={selectedOption}
            className="h-5 w-5"
          />
          <div className="flex items-center justify-between w-full gap-7">
            <span> {selectedOption}</span>
            <svg
              className={`-mr-1 h-5 w-5 text-gray-400 transform ${isDropdownOpen ? "rotate-180" : ""
                }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

      </div>


      {isDropdownOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 cursor-pointer"
                role="menuitem"
              >
                <img src={option.icon} alt={option.label} className="h-5 w-5" />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectMenu