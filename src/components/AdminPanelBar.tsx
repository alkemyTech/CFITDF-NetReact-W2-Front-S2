import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";

type AdminPanelBarProps = {
    drawerWidth: number;
    navbarHeight: number;
};

const AdminPanelBar = ({ drawerWidth, navbarHeight }: AdminPanelBarProps) => {
    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={3}
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                top: navbarHeight,
                height: 48,
                backgroundColor: "#f0f0f0",
                boxSizing: "border-box",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ display: "flex", gap: 3, minHeight: 48 }}>
                <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
                    Dashboard Admin
                </Link>
                <Link to="/admin/usuarios" style={{ color: "inherit", textDecoration: "none" }}>
                    Gestionar Usuarios
                </Link>
                <Link to="/admin/reportes" style={{ color: "inherit", textDecoration: "none" }}>
                    Ver Reportes
                </Link>
                <Link to="/admin/configuracion" style={{ color: "inherit", textDecoration: "none" }}>
                    Configuración
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default AdminPanelBar;