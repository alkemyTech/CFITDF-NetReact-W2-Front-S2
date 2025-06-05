import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { drawerWidth } from "../layouts/layoutConstant";

type NavbarProps = {
    adminPanelOpen: boolean;
    onToggleAdminPanel: () => void;
};

export default function Navbar({ adminPanelOpen, onToggleAdminPanel }: NavbarProps) {
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
                {/* Izquierda: botones de navegación */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button component={Link} to="/Profile" color="inherit">Perfil</Button>
                    <Button component={Link} to="/Accounts" color="inherit">Cuentas</Button>
                    <Button component={Link} to="/Movements" color="inherit">Movimientos</Button> 


                    {rol === "BANCO" && (
                        <Button onClick={onToggleAdminPanel} color="inherit">
                            {adminPanelOpen ? "Cerrar Admin" : "Admin Panel"}
                        </Button>
                    )}
                </Box>

                {/* Derecha: botón salir + admin panel (si rol BANCO) + rol */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        onClick={logout}
                        color="warning"
                        variant="contained"
                        sx={{ color: "white" }}
                    >
                        Cerrar Sesion
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