import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Alert, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { login as apiLogin } from '../api/AuthService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ Mail: "", Password: "" });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    // Limpia el formulario cada vez que el componente se monta
    useEffect(() => {
        setForm({ Mail: "", Password: "" });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await apiLogin({ mail: form.Mail, Password: form.Password });
            console.log("Login response:", res);

            if (res.token) {
                // Mapeo fijo de roles según tipo_cliente
                const rolMap: Record<"BANCO" | "BILLETERA", string> = {
                    BANCO: "BANCO",         // <- lo que se guarda en la BD y se espera en PrivateRoute
                    BILLETERA: "BILLETERA"
                };

                // Tomamos el tipo_cliente y lo pasamos a mayúsculas
                const tipoCliente = (res.usuario?.tipo_cliente as string | undefined)?.toUpperCase() || "";
                console.log("Tipo de cliente recibido:", tipoCliente);

                // Validamos que tipoCliente sea una de las claves esperadas antes de indexar rolMap
                if (!(tipoCliente in rolMap)) {
                    setMensaje("❌ Tipo de cliente no válido");
                    setError(true);
                    return;
                }

                const rol = rolMap[tipoCliente as keyof typeof rolMap];
                console.log("Rol asignado:", rol);

                login(res.token, rol);
                // Mostrar mensaje bienvenida antes de navegar
                setMensaje(`✅ ¡Bienvenido, ${res.usuario?.nombre || "usuario"}!`);
                setError(false);    
                if (rol === "Administrador") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            } else {
                setMensaje("❌ Credenciales inválidas");
                setError(true);
            }
        } catch (error) {
            setMensaje("❌ Error en login");
            setError(true);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h5" textAlign="center">Iniciar Sesión</Typography>
                <TextField
                    name="Mail"
                    label="Email"
                    type="email"
                    value={form.Mail}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="Password"
                    label="Contraseña"
                    type="password"
                    value={form.Password}
                    onChange={handleChange}
                    required
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
    );
};

export default Login;