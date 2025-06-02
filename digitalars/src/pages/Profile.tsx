import { Card, CardContent, Typography, Button } from "@mui/material";
import * as React from "react";

export default function Profile() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>
            <Card className="card">
                <CardContent>
                    <Typography variant="h6">Nombre</Typography>
                    <Typography variant="body1">Maira Zamparini</Typography>

                    <Typography variant="h6" className="mt-4">Email</Typography>
                    <Typography variant="body1">maira@example.com</Typography>

                    <Button variant="contained" color="primary" className="mt-4">
                        Editar perfil
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
