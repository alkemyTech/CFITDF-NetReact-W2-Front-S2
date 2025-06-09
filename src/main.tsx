import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/ui/theme';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline } from '@mui/material'; // <- opcional, para resetear estilos

const container = document.getElementById('root');
if (!container) throw new Error("No se encontró el contenedor root");

createRoot(container).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* ← opcional pero recomendado para estilos base */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);