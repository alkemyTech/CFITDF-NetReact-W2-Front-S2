import {Drawer,List,ListItem,ListItemButton,ListItemText,Toolbar,Divider,Box,Typography} from "@mui/material";
import { drawerWidth } from "../../layouts/layoutConstant";

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
                    backgroundColor: "#f0f0f0", // mismo color que AdminPanelBar
                },
            }}
        >
           
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