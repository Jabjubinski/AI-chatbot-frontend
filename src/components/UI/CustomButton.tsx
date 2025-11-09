import clsx from "clsx";
import React from "react";

interface CustomButtonProps {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" |  "high" | "full",
  disabled?: boolean;
  label?: string;
  labelColor?: string;
}

export default function CustomButton({
  className,
  onClick,
  children,
  type,
  size = 'small',
  disabled,
  label,
  labelColor,
}: CustomButtonProps) {
  return (
    <div
      className={clsx(
        "flex flex-col",
        size === 'small' && "",
        size === "medium" && "",
        size === "high" && "",
        size === "full" && "w-full"
      )}
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
