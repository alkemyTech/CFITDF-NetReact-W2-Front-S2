
import * as React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import Register from './pages/Register';
import Movements from './pages/Movements';
import Profile from './pages/Profile';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Transferencia from "./pages/Transferencia";
import Deposito from "./pages/Deposito";


function App() {
    const isAuthenticated = !!localStorage.getItem("token");
    return (
        <BrowserRouter>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/movimientos" element={<Movements />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transferir" element={<Transferencia />} />
                        <Route path="/depositar" element={<Deposito />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
