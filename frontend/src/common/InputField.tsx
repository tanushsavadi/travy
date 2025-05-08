import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange, placeholder, error, required = false }) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 outline-none transition ${
          error ? "border-red-500" : "border-gray-400 focus:border-white"
        }`}
        required={required}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
