import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className = "" }: Props) => {
  return (
    <button
      className={`rounded-md font-medium transition-colors focus: outline-none focus: ring-2 focus:ring-2blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
