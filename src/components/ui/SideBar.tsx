import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Divider, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { drawerWidth } from "../../layouts/layoutConstant";

type SidebarProps = {
    hideMenuItems?: boolean;
};

const accionesMap = {
    "Transferir dinero": "transferir",
    "Ingresar dinero": "ingresar",
    "Recargar SUBE": "recargar",
} as const;

type AccionTexto = keyof typeof accionesMap;

export default function Sidebar({ hideMenuItems = false }: SidebarProps) {
    const navigate = useNavigate();

    const handleNavigation = (accionTexto: AccionTexto) => {
        const accion = accionesMap[accionTexto];
        navigate(`/dashboard/operaciones?accion=${accion}`);
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 180,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#f0f0f0",
                },
            }}
        >
            <Toolbar />

            {/* Logo o título */}
            <Box sx={{ p: 2, textAlign: "center" }}>
                <img src="/logo.png" alt="Logo" style={{ width: "80%", height: "auto" }} />
            </Box>

            <Divider />

            {!hideMenuItems && (
                <List>
                    {(Object.keys(accionesMap) as AccionTexto[]).map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleNavigation(text)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Drawer>
    );
}