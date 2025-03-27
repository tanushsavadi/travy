import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      <div className="w-full border rounded-lg px-4 py-2 bg-white/10 text-white flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-300">
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
