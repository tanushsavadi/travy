import React from 'react';

interface TextAreaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, onChange }) => {
  return (
    <div className="flex flex-col gap-2 justify-start">
      <label className="flex text-white text-sm font-medium">{label}</label>
      <textarea className="block p-4 border-0 rounded-md bg-[#2b2b2b] min-h-[10vh] max-h-[20vh] focus:outline-1 focus:outline-[#888888]" onChange={onChange}/>
    </div>
  );
};

export default TextAreaField;
