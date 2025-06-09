import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/ui/SideBar";
import { useAuth } from "../context/AuthContext";
import { getResumenPorRango, RangoFechasMovDTO } from "../api/AuthService";

interface MovimientoDetalleDTO {
    id_trx: number;
    fecha: string;
    monto: number;
    descripcion: string;
    nroCuentaOrigen: number;
    nroCuentaDestino: number;
}

const Movements: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [movimientos, setMovimientos] = useState<MovimientoDetalleDTO[]>([]);
    const [error, setError] = useState('');

    const handleBuscar = async () => {
        if (!fechaDesde || !fechaHasta) {
            setError('Debes completar ambas fechas');
            return;
        }
        setError('');
        try {
            const rango: RangoFechasMovDTO = { fechaDesde, fechaHasta };
            const data = await getResumenPorRango(token!, rango);
            setMovimientos(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al obtener movimientos');
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Resumen de Movimientos
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            label="Fecha Desde"
                            type="date"
                            value={fechaDesde}
                            onChange={e => setFechaDesde(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Fecha Hasta"
                            type="date"
                            value={fechaHasta}
                            onChange={e => setFechaHasta(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant="contained" onClick={handleBuscar}>
                            Buscar
                        </Button>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {movimientos.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Monto</TableCell>
                                    <TableCell>Origen</TableCell>
                                    <TableCell>Destino</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movimientos.map(mov => (
                                    <TableRow key={mov.id_trx}>
                                        <TableCell>{new Date(mov.fecha).toLocaleString()}</TableCell>
                                        <TableCell>{mov.descripcion}</TableCell>
                                        <TableCell>{mov.monto.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</TableCell>
                                        <TableCell>{mov.nroCuentaOrigen}</TableCell>
                                        <TableCell>{mov.nroCuentaDestino}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        !error && <Typography>No hay movimientos para el rango seleccionado.</Typography>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Movements;
