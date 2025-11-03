import React from "react";

interface CustomButtonProps {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  label?: string;
  labelColor?: string;
}

export default function CustomButton({
  className,
  onClick,
  children,
  type,
  disabled,
  label,
  labelColor,
}: CustomButtonProps) {
  return (
    <div
      className="flex flex-col"
      style={{ color: `${labelColor ? labelColor : "white"}` }}
    >
      <div>{label}</div>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    </div>
  );
}
