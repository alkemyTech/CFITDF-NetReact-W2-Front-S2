
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-6 mt-6">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Logo y nombre */}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold">DigitalARS</h2>
                    <p className="text-sm">Tu billetera virtual confiable</p>
                </div>

                {/* Enlaces útiles */}
                <div className="flex flex-col md:flex-row gap-4 text-sm text-center md:text-left">
                    <Link to="/accounts" className="hover:underline">Cuentas</Link>
                    <Link to="/movements" className="hover:underline">Movimientos</Link>
                    <Link to="/profile" className="hover:underline">Perfil</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Registrarse</Link>
                </div>

                {/* Redes sociales 
                <div className="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <Facebook size={20} className="hover:text-blue-400" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <Instagram size={20} className="hover:text-pink-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <Linkedin size={20} className="hover:text-blue-300" />
                    </a>
                </div>*/}
            </div>

            <div className="mt-4 text-center text-xs text-gray-300">
                © 2025 DigitalARS. Todos los derechos reservados.
            </div>
        </footer>
    );
}
