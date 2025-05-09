import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-300 transition shadow-md"
    >
      {text}
    </button>
  );
};

export default Button;
