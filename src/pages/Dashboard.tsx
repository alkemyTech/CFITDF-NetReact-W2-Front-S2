import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/ui/SideBar";
import { useAuth } from "../context/AuthContext";
import { getPerfil } from "../api/AuthService";

interface Usuario {
    nombre: string;
    nro_cuenta: string;
    saldo: number | null;
    cbu: string;
}

const Dashboard: React.FC = () => {
    const { token } = useAuth();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            console.warn("Token no disponible");
            return;
        }

        getPerfil(token)
            .then((data) => {
                console.log("Datos perfil recibidos:", data);

                // Si recibimos cuentas en $values (array)
                if (data.$values && Array.isArray(data.$values) && data.$values.length > 0) {
                    const primeraCuenta = data.$values[0];
                    const saldoTotal = data.$values.reduce((acc: number, cuenta: any) => {
                        const saldoCuenta = Number(cuenta.saldo);
                        return acc + (isNaN(saldoCuenta) ? 0 : saldoCuenta);
                    }, 0);

                    setUsuario({
                        nombre: data.nombre || primeraCuenta.nombre || "Sin nombre",
                        nro_cuenta: primeraCuenta.nro_cuenta?.toString() || "0",
                        saldo: saldoTotal,
                        cbu: primeraCuenta.cbu || "Sin CBU",
                    });
                } else {
                    // Caso simple: data tiene los campos directamente
                    setUsuario({
                        nombre: data.nombre || "Sin nombre",
                        nro_cuenta: (data.nro_cuenta !== undefined ? data.nro_cuenta.toString() : "0"),
                        saldo: Number(data.saldo) || 0,
                        cbu: data.cbu || "Sin CBU",
                    });
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener perfil:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [token]);

    const formatCurrency = (value?: number | null) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "-";
        }
        return value.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        });
    };

    const handleVerCVU = () => {
        if (usuario) alert(`Tu CVU (CBU) es: ${usuario.cbu}`);
    };

    if (loading) return <Typography>Cargando...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, pl: 1, pt: 2 }}>
                {usuario && (
                    <Box className="min-h-screen bg-gradient-to-b from-indigo-100 to-white p-2">
                        <Box className="text-left" style={{ marginLeft: "-1rem" }}>
                            <Typography variant="h5" className="mb-2 font-semibold text-indigo-900">
                                Hola <span className="font-bold">{usuario.nombre}</span>
                            </Typography>
                            <Card className="shadow-lg mb-6 bg-white rounded-2xl p-4">
                                <CardContent>
                                    <Typography variant="body1" className="mb-1">
                                        <strong>NroCuenta:</strong> {usuario.nro_cuenta}
                                    </Typography>
                                    <Typography variant="body1" className="mb-2">
                                        <strong>Saldo:</strong> {formatCurrency(usuario.saldo)}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="text"
                                        onClick={handleVerCVU}
                                        className="font-bold text-indigo-700 hover:text-indigo-900"
                                    >
                                        Ver CVU (CBU)
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Dashboard;