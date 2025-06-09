// src/pages/Accounts.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/ui/SideBar";

export default function Accounts() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCrearCuenta = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <Navbar onlyProfile />
            <Box sx={{ display: "flex" }}>
                <Sidebar hideMenuItems />

                <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Hola, {user?.nombre || "Usuario"} Bienvenido a digitalArs
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        ¿Desea abrir una cuenta?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCrearCuenta}
                    >
                        ¡Crear Cuenta!
                    </Button>
                </Box>
            </Box>
        </>
    );
}