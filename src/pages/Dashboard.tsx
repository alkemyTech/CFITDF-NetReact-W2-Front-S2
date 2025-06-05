 import * as React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <Box className="min-h-screen bg-gradient-to-b from-indigo-100 to-white p-6">
            <Box className="max-w-md mx-auto text-center">
                <Typography variant="h4" className="mb-4 font-bold text-indigo-800">
                    Mi Billetera DigitalARS 💸
                </Typography>

                <Card className="shadow-lg mb-6 bg-white rounded-2xl">
                    <CardContent>
                        <Typography variant="h6" color="textSecondary">Saldo disponible</Typography>
                        <Typography variant="h3" className="text-green-600 mt-2">
                            $15.000
                        </Typography>
                    </CardContent>
                </Card>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => handleNavigate("/transferir")}
                        >
                            Transferir
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            onClick={() => handleNavigate("/depositar")}
                        >
                            Depositar
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={() => handleNavigate("/movimientos")}
                        >
                            Movimientos
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleNavigate("/perfil")}
                        >
                            Editar Perfil
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
