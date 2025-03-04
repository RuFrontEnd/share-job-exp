import React from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  icon,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors ${className}`}
    >
      {!!icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
