import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // value?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  inputClassName?: string;
}
const TextBox = ({
  value,
  onChange,
  label,
  className = "",
  inputClassName = "",
  ...props
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        {...props}
        value={value ?? ""}
        onChange={onChange}
        className={`px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
      />
    </div>
  );
};

export default TextBox;
