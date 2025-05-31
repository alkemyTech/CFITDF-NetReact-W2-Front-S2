import { useState } from "react";
import { login, LoginDTO } from "../services/authService";
import * as React from "react";
import { TextField, Button, Container, Typography } from '@mui/material'



const Login = () => {
    const [form, setForm] = useState<LoginDTO>({ mail: "", Password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await login(form);
        console.log("Login response:", res);
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" gutterBottom>Iniciar sesion</Typography>
            <TextField fullWidth label="Email" margin="normal" onChange={e => setMail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth onClick={handleSubmit}>Ingresar</Button>
        </Container>
    );
};

export default Login;
