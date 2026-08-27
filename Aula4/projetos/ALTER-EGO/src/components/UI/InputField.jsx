import React from "react";

/**
 * INPUT FIELD COMPONENT
 * Reusable input with styling
 */
export const InputField = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = null,
  label = null,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm text-text2 block mb-2 font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 
          bg-surface border border-border2 
          text-text placeholder-text3
          rounded-lg
          focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20
          transition-all duration-200
          ${error ? "border-red" : ""}
        `}
        {...props}
      />
      {error && <p className="text-red text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
