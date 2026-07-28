import type { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const InputField = ({ label, error, ...props }: InputFieldProps) => {
  return (
    <div style={{ margin: "10px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label>{label}</label>}
      <input
        {...props}
        style={{
          padding: "8px",
          fontSize: "16px",
          border: error ? "1px solid #e53935" : "1px solid #ccc",
          borderRadius: "6px",
          ...props.style,
        }}
      />
      {error && <span style={{ color: "#e53935", fontSize: "12px" }}>{error}</span>}
    </div>
  );
};

export default InputField;
