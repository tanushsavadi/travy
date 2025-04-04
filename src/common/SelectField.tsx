import React from 'react';
import './SelectField.css';

interface SelectFieldProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const SelectContainerCSS: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
    justifyContent: "start",
    width: '100%'
};

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => {
  return (
    <div style={SelectContainerCSS}>
      <label style={{alignSelf: 'center'}}>{label}</label>
      <select className='select-field'>
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