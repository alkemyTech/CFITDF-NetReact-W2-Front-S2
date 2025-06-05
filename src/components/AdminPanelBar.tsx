import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPanelBar = () => {
    const { rol } = useAuth();

    // Solo muestra si el rol es BANCO (Administrador)
    if (rol !== 'BANCO') return null;

    return (
        <aside className="w-64 bg-gray-900 text-white h-screen p-6 fixed left-0 top-0 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">Panel de Administración</h2>
            <nav className="flex flex-col gap-4">
                <Link to="/admin" className="hover:text-blue-400">Dashboard Admin</Link>
                <Link to="/admin/usuarios" className="hover:text-blue-400">Gestionar Usuarios</Link>
                <Link to="/admin/reportes" className="hover:text-blue-400">Ver Reportes</Link>
                <Link to="/admin/configuracion" className="hover:text-blue-400">Configuración</Link>
            </nav>
        </aside>
    );
};

export default AdminPanelBar;