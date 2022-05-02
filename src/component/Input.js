import clsx from "clsx";
import * as React from "react";

export default function Input({
  label,
  placeholder = "",
  helperText,
  id,
  type = "text",
  validation,
  containerClassName,
  onChange,
  value,
  ...rest
}) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-normal text-white">
        {label}
      </label>
      <div className={clsx(label !== "" && "mt-1", "relative")}>
        <input
          {...rest}
          onChange={onChange}
          value={value}
          type={type}
          name={id}
          id={id}
          className={clsx(
            "bg-white/10 p-2 text-white placeholder:text-white/50 shadow-inner",
            "block w-full rounded-md shadow-sm  "
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
        {/* If there is helper text, or no hideError, then render*/}
        {helperText && (
          <div className="mt-1">
            {helperText && (
              <p className="text-xs text-secondary-1">{helperText}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
