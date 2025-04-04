import React from 'react';
import './InputField.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
}

const InputContainerCSS: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5em",
  width: '100%',
  justifyContent: "start"
};

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', placeholder="" }) => {
  return (
    <div style={InputContainerCSS}>
      {label && <label style={{alignSelf: 'start'}}>{label}</label>}
      <input className='input-field' type={type} placeholder={placeholder}/>
    </div>
  );
};

export default InputField;