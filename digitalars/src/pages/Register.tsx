import { useState } from "react";
import { register, RegisterRequest } from "../services/authService";
import * as React from "react";
import { Container, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";


const Register = () => {
    const [form, setForm] = useState<RegisterRequest>({
        
        Nombre: "",
        Apellido: "",
        mail: "",
        
        Direccion: "",
        Telefono: "",
        Password: "",
        Tipo_cliente: "BILLETERA"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await register(form);
        console.log("Registro response:", res);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom textAlign="center">Crear Cuenta</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="Nombre" value={form.Nombre} onChange={handleChange} required />
                <TextField label="Apellido" name="Apellido" value={form.Apellido} onChange={handleChange} required />
                <TextField label="Email" name="mail" type="email" value={form.mail} onChange={handleChange} required />
                <TextField label="Dirección" name="Direccion" value={form.Direccion} onChange={handleChange} />
                <TextField label="Teléfono" name="Telefono" value={form.Telefono} onChange={handleChange} />
                <TextField label="Contraseña" name="Password" type="password" value={form.Password} onChange={handleChange} required />

                <FormControl fullWidth>
                    <InputLabel>Tipo de Cliente</InputLabel>
                    <Select name="Tipo_cliente" value={form.Tipo_cliente} onChange={handleChange} label="Tipo de Cliente">
                        <MenuItem value="BILLETERA">Billetera</MenuItem>
                        <MenuItem value="BANCO">Banco</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" type="submit" size="large">Registrarse</Button>
            </Box>
        </Container>
    );
};

export default Register;
