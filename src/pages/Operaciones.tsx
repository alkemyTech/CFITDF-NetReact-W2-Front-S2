import React, { useEffect } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import Transfer from "../pages/Actions/Transfer";
import Deposit from "../pages/Actions/Deposit";
import Recar from "../pages/Actions/Recar";

const accionToIndex: Record<string, number> = {
    transferir: 0,
    ingresar: 1,
    recargar: 2,
};

const indexToAccion: Record<number, string> = {
    0: "transferir",
    1: "ingresar",
    2: "recargar",
};

const Operaciones = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Obtener el parámetro 'accion' de la URL
    const accion = searchParams.get("accion") || "transferir";

    // Determinar la pestaña activa según el parámetro
    const selectedTab = accionToIndex[accion] ?? 0;

    // Cuando el usuario cambia pestaña, actualizar el query param en URL
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSearchParams({ accion: indexToAccion[newValue] });
    };

    // Si el parámetro accion no es válido, redirigir a 'transferir' (opcional)
    useEffect(() => {
        if (!(accion in accionToIndex)) {
            setSearchParams({ accion: "transferir" });
        }
    }, [accion, setSearchParams]);

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Operaciones
            </Typography>

            <Tabs value={selectedTab} onChange={handleChange} centered>
                <Tab label="Transferir dinero" />
                <Tab label="Ingresar dinero" />
                <Tab label="Recargar SUBE" />
            </Tabs>

            <Box sx={{ mt: 4 }}>
                {selectedTab === 0 && <Transfer />}
                {selectedTab === 1 && <Deposit />}
                {selectedTab === 2 && <Recar />}
            </Box>
        </Box>
    );
};

export default Operaciones;