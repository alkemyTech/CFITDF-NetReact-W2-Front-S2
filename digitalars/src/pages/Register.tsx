import { useState } from "react";
import { register, RegisterRequest } from "../services/authService";
import * as React from "react";
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterRequest>({
        
        Nombre: "",
        Apellido: "",
        Mail: "",
        
        Direccion: "",
        Telefono: "",
        Password: "",
        Tipo_cliente: "BILLETERA"
    });

    const [mensaje, setMensaje] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       // const res = await register(form);
        //console.log("Registro response:", res);
        try {
            const res = await axios.post("http://localhost:5044/api/Auth/register", form);

            setMensaje("✅ Usuario creado correctamente");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al registrar";
            setMensaje(`❌ ${msg}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom textAlign="center">Crear Usuario</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="Nombre" value={form.Nombre} onChange={handleChange} required />
                <TextField label="Apellido" name="Apellido" value={form.Apellido} onChange={handleChange} required />
                <TextField label="Email" name="Mail" type="email" value={form.Mail} onChange={handleChange} required />
                <TextField label="Direccion" name="Direccion" value={form.Direccion} onChange={handleChange} />
                <TextField label="Telefono" name="Telefono" value={form.Telefono} onChange={handleChange} />
                <TextField label="Password" name="Password" type="password" value={form.Password} onChange={handleChange} required />

                <FormControl fullWidth>
                    <InputLabel>Tipo de Cliente</InputLabel>
                    <Select name="Tipo_cliente" value={form.Tipo_cliente} label="Tipo de Cliente" onChange={handleChange}>
                        <MenuItem value="BILLETERA">Billetera</MenuItem>
                        <MenuItem value="BANCO">Administrador</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" type="submit" size="large">Registrarse</Button>

            </Box>
            {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
        </Container>
    );
};

export default Register;
