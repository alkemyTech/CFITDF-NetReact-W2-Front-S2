import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Divider,
    Box,
    Typography
} from "@mui/material";

const drawerWidth = 200;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#c0c0c0", // usa el color de fondo del tema
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // agrega sombra similar a la de MUI Drawer
                },
            }}
        >
            <Toolbar />
            
            {/* Logo o título */}
            <Box sx={{ p: 2, textAlign: "center" }}>
                <img src="/logo.png" alt="Logo" style={{ width: "80%", height: "auto" }} />
               
            </Box>
            <Divider />
            <List>
                {["Transferir dinero", "Ingresar dinero", "Sacar dinero", "Recargar"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}