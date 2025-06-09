import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
}