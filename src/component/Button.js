import React from "react";
import clsxm from "../lib/clsxm";

export default function Button({
  children,
  className,
  disabled,
  isLoading,
  variant = "primary",
  isDarkBg = false,

  ...rest
}) {
  return (
    <button
      {...rest}
      className={clsxm(
        "inline-flex items-center px-4 py-2 font-bold rounded-lg",
        "focus:outline-none focus-visible:ring focus-visible:ring-primary-1",
        "shadow-sm",
        "transition-colors duration-75",

        "bg-black text-white",
        "border border-primary-1",
        "hover:bg-primary-2 hover:text-white",
        "active:bg-primary-1",
        "disabled:bg-primary-1/50 disabled:hover:bg-primary-1/50"
      )}
    >
      {children}
    </button>
  );
}
