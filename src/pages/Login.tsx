import React, { useState } from "react";
import { Container, Typography, TextField, Button, Alert, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { login as apiLogin } from '../api/AuthService';
import { useAuth } from '../context/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ mail: "", password: "" });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await apiLogin({ mail: form.mail, Password: form.password });

            console.log("Login response:", res);

            if (res.token) {
                const rolMap: Record<"BANCO" | "BILLETERA", string> = {
                    BANCO: "BANCO",
                    BILLETERA: "BILLETERA"
                };

                const tipoCliente = (res.usuario?.tipo_cliente as string | undefined)?.toUpperCase() || "";
                console.log("Tipo de cliente recibido:", tipoCliente);

                if (!(tipoCliente in rolMap)) {
                    setMensaje("❌ Tipo de cliente no válido");
                    setError(true);
                    return;
                }

                const rol = rolMap[tipoCliente as keyof typeof rolMap];
                console.log("Rol asignado:", rol);

                login(res.token, rol, res.usuario);

                setMensaje(`✅ ¡Bienvenido, ${res.usuario?.nombre || "usuario"}!`);
                setError(false);

                if (rol === "BANCO") {
                    navigate("/admin");
                } else {
                    navigate("/cuenta");
                }
            } else {
                setMensaje("❌ Credenciales inválidas");
                setError(true);
            }
        } catch (error) {
            console.error("Error en login:", error);
            setMensaje("❌ Error en login");
            setError(true);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: "bold", color: "#1976d2" }}>¡Bienvenidos!</Typography>
            <img src="/logo.png" alt="Logo" style={{ width: "160px" }} />

            <Container maxWidth="xs">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        name="mail"
                        label="Email"
                        type="email"
                        value={form.mail}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button type="submit" variant="contained" fullWidth>Ingresar</Button>

                    <Typography variant="body2" textAlign="center">
                        ¿No tenés usuario?{" "}
                        <Link to="/register" style={{ color: "#3f51b5", fontWeight: "bold", textDecoration: "none" }}>
                            Crear usuario
                        </Link>
                    </Typography>

                    {mensaje && (
                        <Alert severity={error ? "error" : "success"}>
                            {mensaje}
                        </Alert>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Login;