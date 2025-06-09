import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { drawerWidth } from "../layouts/layoutConstant";

type NavbarProps = {
    adminPanelOpen?: boolean;
    onToggleAdminPanel?: () => void;
    onlyProfile?: boolean;
};

export default function Navbar({ adminPanelOpen = false, onToggleAdminPanel = () => { }, onlyProfile = false }: NavbarProps) {
    const navigate = useNavigate();
    const { rol, logout } = useAuth();

    const getRolLabel = (rol: string) => {
        switch (rol) {
            case "BANCO":
                return "Administrador";
            case "CUENTA":
                return "Usuario";
            default:
                return rol;
        }
    };

    return (
        <AppBar
            position="fixed"
            color="primary"
            elevation={2}
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Izquierda: botones de navegación, ocultos si onlyProfile */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    {!onlyProfile && (
                        <>
                            <Button component={Link} to="/perfil" color="inherit">Perfil</Button>
                            <Button component={Link} to="/movements" color="inherit">Movimientos</Button>
                            {rol === "BANCO" && (
                                <Button onClick={onToggleAdminPanel} color="inherit">
                                    {adminPanelOpen ? "Cerrar Admin" : "Admin Panel"}
                                </Button>
                            )}
                        </>
                    )}
                </Box>

                {/* Derecha: botón salir + rol */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        onClick={logout}
                        color="warning"
                        variant="contained"
                        sx={{ color: "white" }}
                    >
                        Cerrar Sesión
                    </Button>

                    {rol && (
                        <Typography variant="body2" sx={{ fontStyle: "italic", color: "#e0e0e0" }}>
                            Rol: {getRolLabel(rol)}
                        </Typography>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}