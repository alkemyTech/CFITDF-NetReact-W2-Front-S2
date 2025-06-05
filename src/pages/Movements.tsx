import { Card, CardContent, Typography } from "@mui/material";
import * as React from "react";

const fakeMovements = [
    { id: 1, description: "Pago en supermercado", amount: -5000, date: "2025-05-25" },
    { id: 2, description: "Transferencia recibida", amount: 12000, date: "2025-05-26" },
];

export default function Movements() {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-semibold">Movimientos</h2>
            {fakeMovements.map((mov) => (
                <Card key={mov.id} className="card">
                    <CardContent>
                        <Typography variant="h6">{mov.description}</Typography>
                        <Typography color={mov.amount < 0 ? "error" : "primary"}>
                            ${mov.amount.toLocaleString("es-AR")}
                        </Typography>
                        <Typography variant="body2">{mov.date}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
