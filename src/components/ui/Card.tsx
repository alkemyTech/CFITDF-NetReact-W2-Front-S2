import * as React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return <div className={`rounded-xl border p-4 shadow-md bg-white ${className}`}>{children}</div>;
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return <div className={`mt-2 text-sm text-gray-700 ${className}`}>{children}</div>;
}