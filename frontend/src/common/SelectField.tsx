import React from 'react';

interface SelectFieldProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, onChange, required }) => {
  return (
    <div className="flex flex-col gap-2 justify-start w-full">
      <label className="block text-white text-sm font-medium">{label}</label>
      <select className='flex p-4 border-0 rounded-md bg-[#2b2b2b] max-h-[30vh] focus:outline-1 focus:outline-[#888888]' onChange={onChange} required={required}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;