// src/components/ui/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // azul MUI
        },
        secondary: {
            main: '#f50057', // rosa
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;