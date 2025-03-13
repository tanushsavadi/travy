import React from 'react';
import './TextAreaField.css';

interface TextAreaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextAreaContainerCSS: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "0.5em",
	justifyContent: "start",
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label }) => {
  return (
    <div style={TextAreaContainerCSS}>
      <label style={{alignSelf: 'start'}}>{label}</label>
      <textarea className='textarea-field'/>
    </div>
  );
};

export default TextAreaField;