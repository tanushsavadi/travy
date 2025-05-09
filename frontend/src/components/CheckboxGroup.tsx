import React from "react";

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selected, setSelected }) => {
  const toggleOption = (option: string) => {
    setSelected(selected.includes(option) ? selected.filter(item => item !== option) : [...selected, option]);
  };

  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggleOption(option)}
            className="mr-2"
          />
          <span className="text-white">{option}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
