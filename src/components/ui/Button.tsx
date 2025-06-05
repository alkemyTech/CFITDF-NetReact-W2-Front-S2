import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
