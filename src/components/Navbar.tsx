import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const navigate = useNavigate();
    const { rol, logout } = useAuth();

  const getRolLabel = (rol: string) => {
    switch (rol) {
      case "BANCO": return "Administrador";
      case "CUENTA": return "Usuario";
      default: return rol;
    }
  };
    const drawerWidth = 200; // o el ancho que uses para tu sidebar
    return (

      <AppBar
          position="fixed" // que quede fijo arriba
          color="primary"
          elevation={2}
          sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`, // margen izquierdo igual al ancho sidebar
              zIndex: (theme) => theme.zIndex.drawer + 1, // para que quede encima del sidebar
          }}
      >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 ,}}>
          <Button component={Link} to="/" color="inherit">Perfil</Button>
          <Button component={Link} to="/cuentas" color="inherit">Cuentas</Button>
          <Button component={Link} to="/movements" color="inherit">Movimientos</Button>
                  <Button onClick={logout}
            color="secondary"
            variant="contained"
            sx={{ color: "white" }}
          >
            Salir
          </Button>
          {rol === "BANCO" && (
            <Button component={Link} to="/admin" color="inherit">
              Admin Panel
            </Button>
          )}
        </Box>
              {rol && (
                  <Typography variant="body2" sx={{ fontStyle: "italic", color: "#e0e0e0" }}>
                      Rol: {getRolLabel(rol)}
                  </Typography>
              )}
      </Toolbar>
    </AppBar>
  );
}

