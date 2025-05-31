import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    DigitalARS
                </Typography>
                <Button color="inherit" component={Link} to="/">Inicio</Button>
                <Button color="inherit" component={Link} to="/movements">Movimientos</Button>
                <Button color="inherit" component={Link} to="/accounts">Cuentas</Button>
                <Button color="inherit" component={Link} to="/profile">Perfil</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
