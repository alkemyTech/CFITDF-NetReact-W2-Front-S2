import { useState } from "react";
import { login, LoginDTO } from "../services/authService";
import * as React from "react";
import { Container, Alert, Typography, TextField, Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginDTO>({ mail: "", Password: "" });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
     //   const res = await login(form);
      //  console.log("Login response:", res);
        try {
            const res = await axios.post("http://localhost:5044/api/Auth/login", form);
            localStorage.setItem("token", res.data.token);
            setMensaje("✅ Bienvenido");
            setError(false);
            setTimeout(() => navigate("/dashboard"), 1000);
          //  navigate("/dashboard");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Credenciales incorrectas";
            setMensaje(`❌ ${msg}`);
            setError(true);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" gutterBottom>Iniciar sesión</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name="mail"
                    value={form.mail}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button variant="contained" fullWidth type="submit">Ingresar</Button>
            </form>
            {mensaje && (
                <Alert severity={error ? "error" : "success"} className="mt-4">
                    {mensaje}
                </Alert>
            )}
        </Container>
    );
};
export default Login;