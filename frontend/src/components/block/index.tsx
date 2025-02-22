import React from "react";

interface BlockProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const Block: React.FC<BlockProps> = ({
  onClick,
  children,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      className={`relative bg-white shadow rounded-lg p-6 border border-gray-200 transition-transform duration-300  ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Block;
