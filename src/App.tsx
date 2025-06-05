import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";
import { Outlet } from "react-router-dom";
//Posibles paginas del navbar ( puede ser modificable)
import Perfil from "./pages/Profile";
import Cuentas from "./pages/Accounts";
import Movements from "./pages/Movements";


function App() {
    const { isAuthenticated, rol } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* Layout general que contiene todas las rutas con Navbar y panel */}
                <Route path="/" element={<MainLayout />}>
                    {/* Redirección inicial según login y rol */}
                    <Route
                        index
                        element={
                            isAuthenticated ? (
                                rol === "BANCO" ? (
                                    <Navigate to="/admin" replace />
                                ) : (
                                    <Navigate to="/dashboard" replace />
                                )
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* Rutas públicas */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <PrivateRoute requiredRole="BANCO">
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    {/* Rutas protegidas para usuarios */}
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="perfil"
                        element={
                            <PrivateRoute>
                                <Perfil />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="cuentas"
                        element={
                            <PrivateRoute>
                                <Cuentas />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="movements"
                        element={
                            <PrivateRoute>
                                <Movements />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta de acceso denegado */}
                    <Route
                        path="unauthorized"
                        element={<h2>No tienes permiso para ver esta página.</h2>}
                    />

                    {/* Ruta no encontrada */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;