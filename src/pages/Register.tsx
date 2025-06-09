import { useState } from "react";
import { RegisterRequest, register } from "../api/AuthService";
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
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
        Tipo_cliente: "BILLETERA" // Siempre BILLETERA fijo
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await register(form);
            setMensaje("✅ Usuario creado correctamente");
            setError(false);
            setTimeout(() => navigate("/login"), 1500);
        } catch (err: any) {
            const msg = err.message || "Error al registrar";
            setMensaje(`❌ ${msg}`);
            setError(true);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom textAlign="center">Crear Usuario</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="Nombre" value={form.Nombre} onChange={handleChange} required />
                <TextField label="Apellido" name="Apellido" value={form.Apellido} onChange={handleChange} required />
                <TextField label="Email" name="Mail" type="email" value={form.Mail} onChange={handleChange} required />
                <TextField label="Dirección" name="Direccion" value={form.Direccion} onChange={handleChange} />
                <TextField label="Teléfono" name="Telefono" value={form.Telefono} onChange={handleChange} />
                <TextField label="Contraseña" name="Password" type="password" value={form.Password} onChange={handleChange} required />

                {/* Aquí no mostramos ni permitimos elegir el tipo, porque siempre es BILLETERA */}

                <Button variant="contained" type="submit" size="large">Registrarse</Button>

                {mensaje && (
                    <Alert severity={error ? "error" : "success"} sx={{ mt: 2 }}>
                        {mensaje}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default Register;