import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Button,
    CircularProgress,
    TextField,
    Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { getPerfil, updatePerfil } from "../api/AuthService";

interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    mail: string;
    rol: string;
    telefono?: string;
    direccion?: string;
}

const Profile: React.FC = () => {
    const { token, logout } = useAuth();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<Usuario>({
        id: 0,
        nombre: "",
        apellido: "",
        mail: "",
        rol: "",
        telefono: "",
        direccion: "",
    });

    useEffect(() => {
        if (!token) {
            setError("No estás autenticado");
            setLoading(false);
            return;
        }

        getPerfil(token)
            .then((data) => {
                const usuarioCompleto = {
                    id: data.id,
                    nombre: data.nombre,
                    apellido: data.apellido || "",
                    mail: data.mail,          // mail, no email
                    rol: data.rol,
                    telefono: data.telefono,
                    direccion: data.direccion,
                };
                setUsuario(usuarioCompleto);
                setFormData(usuarioCompleto);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar el perfil");
                setLoading(false);
            });
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!token || !usuario || !usuario.id) {
            setError("Datos de usuario inválidos");
            return;
        }

        try {
            const success = await updatePerfil(token, {
                id: usuario.id,
                nombre: formData.nombre,
                apellido: formData.apellido,
                direccion: formData.direccion || "",
                mail: formData.mail,
                telefono: formData.telefono || "",
            });

            if (success) {
                setUsuario(formData);
                setEditMode(false);
                setSuccessMessage("Perfil actualizado correctamente");
                setError(null);
            } else {
                setError("No se pudo actualizar el perfil");
            }
        } catch (err) {
            setError("Error al actualizar el perfil");
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Perfil de Usuario
            </Typography>

            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {usuario && (
                <>
                    {editMode ? (
                        <>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                            {/* Opcional: mostrar mail en campo deshabilitado */}
                            {/* <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="mail"
                                value={formData.mail}
                                disabled
                            /> */}
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Dirección"
                                name="direccion"
                                value={formData.direccion || ""}
                                onChange={handleChange}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleSave}
                            >
                                Guardar Cambios
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mt: 2, ml: 2 }}
                                onClick={() => setEditMode(false)}
                            >
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6">Nombre: {usuario.nombre}</Typography>
                            <Typography variant="h6">Apellido: {usuario.apellido}</Typography>
                            {/* <Typography variant="body1">Email: {usuario.mail}</Typography> */}
                            <Typography variant="body1">Rol: {usuario.rol}</Typography>
                            {usuario.telefono && (
                                <Typography variant="body1">Teléfono: {usuario.telefono}</Typography>
                            )}
                            {usuario.direccion && (
                                <Typography variant="body1">Dirección: {usuario.direccion}</Typography>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                onClick={() => setEditMode(true)}
                            >
                                Editar Perfil
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mt: 2, ml: 2 }}
                                onClick={logout}
                            >
                                Cerrar Sesión
                            </Button>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

export default Profile;