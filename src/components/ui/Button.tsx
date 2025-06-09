import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";  // podés agregar más variantes si querés
    className?: string;
}

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
    const variantClasses =
        variant === "secondary"
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-700";

    return (
        <button
            className={`${variantClasses} text-white py-2 px-4 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}