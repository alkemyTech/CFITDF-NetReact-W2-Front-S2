// src/pages/Accounts.tsx
import * as React from 'react';
import { CreditCard, AccountBalanceWallet } from '@mui/icons-material';

const accounts = [
    {
        id: 1,
        name: 'Cuenta Principal',
        balance: 152340.75,
        icon: <AccountBalanceWallet fontSize="large" />,
        gradient: 'from-blue-500 to-indigo-500',
    },
    {
        id: 2,
        name: 'Caja de Ahorro',
        balance: 50340.00,
        icon: <CreditCard fontSize="large" />,
        gradient: 'from-green-500 to-emerald-500',
    },
];

const formatCurrency = (value: number) =>
    value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });

export default function Accounts() {
    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
                <div
                    key={account.id}
                    className={`bg-gradient-to-br ${account.gradient} text-white rounded-2xl shadow-xl p-6 relative overflow-hidden hover:scale-105 transition-transform duration-300`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{account.name}</h2>
                        <div className="opacity-80">{account.icon}</div>
                    </div>
                    <p className="text-sm opacity-80">Saldo disponible</p>
                    <p className="text-2xl font-semibold mt-2">{formatCurrency(account.balance)}</p>
                </div>
            ))}
        </div>
    );
}
