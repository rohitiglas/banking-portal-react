import type { SelectHTMLAttributes } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: DropdownOption[];
};

const Dropdown = ({ label, error, options, ...props }: DropdownProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label>{label}</label>}
      <select
        {...props}
        style={{
          padding: "8px",
          fontSize: "16px",
          border: error ? "1px solid #e53935" : "1px solid #ccc",
          borderRadius: "6px",
          ...props.style,
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span style={{ color: "#e53935", fontSize: "12px" }}>{error}</span>}
    </div>
  );
};

export default Dropdown;
