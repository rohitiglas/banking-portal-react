import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const Button = ({ children, variant = "primary", style, ...props }: ButtonProps) => {
  const baseStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "16px",
    borderRadius: "6px",
    margin: "10px 0",
    border: "none",
    cursor: props.disabled ? "not-allowed" : "pointer",
    opacity: props.disabled ? 0.7 : 1,
    backgroundColor: variant === "secondary" ? "#e0e0e0" : "#2563eb",
    color: variant === "secondary" ? "#111827" : "#fff",
  };

  return (
    <button {...props} style={{ ...baseStyle, ...style }}>
      {children}
    </button>
  );
};

export default Button;
