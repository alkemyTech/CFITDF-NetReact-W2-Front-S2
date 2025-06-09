import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";
import Perfil from "./pages/Profile";
import Cuentas from "./pages/Accounts";
import Movements from "./pages/Movements";
import Operaciones from "./pages/Operaciones";
function App() {
    const { isAuthenticated, rol } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* Redirección inicial */}
                    <Route
                        index
                        element={
                            isAuthenticated ? (
                                rol === "BANCO" ? (
                                    <Navigate to="/admin" replace />
                                ) : rol === "BILLETERA" ? (
                                    <Navigate to="/cuentas" replace />
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

                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />   
                            </PrivateRoute>
                        }

                    >
                        <Route index element={<Dashboard />} />
                        <Route path="operaciones" element={<Operaciones />} />
                    </Route>
                    <Route
                        path="admin"
                        element={
                            <PrivateRoute requiredRole="BANCO">
                                <AdminDashboard />
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
                            <PrivateRoute requiredRole="BILLETERA">
                                <Movements />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/operaciones"
                        element={
                            <PrivateRoute requiredRole="BILLETERA">
                                <Operaciones />
                            </PrivateRoute>
                        }
                    />



                    {/* Rutas de error y fallback */}
                    <Route
                        path="unauthorized"
                        element={<h2>No tienes permiso para ver esta página.</h2>}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
