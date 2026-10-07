
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    children,
    className = "",
    type = "button",
    onClick,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
