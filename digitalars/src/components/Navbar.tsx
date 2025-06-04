// src/components/Navbar.tsx
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Dashboard</Link>
                <Link to="/movements" className="hover:underline">Movimientos</Link>
              
            </div>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Salir</button>
        </nav>
    );
};

export default Navbar;
