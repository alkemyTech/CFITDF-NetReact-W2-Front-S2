import axios from 'axios';

       
const API_BASE = "https://localhost:7153/api/movimientos";
export const transferir = async (token: string, data: {
    nroCuentaOrigen: number;
    destino: string;
    monto: number;
}) => {
    return await axios.post(`${API_BASE}/transferir`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const depositar = async (token: string, data: {
    monto: number;   // No enviar nroCuenta porque no se usa
}) => {
    return await axios.post(`${API_BASE}/depositar`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const recargarSube = async (token: string, data: {
    nroCuenta: number;
    monto: number;
}) => {
    return await axios.post(`${API_BASE}/recargar-sube`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

/*export const obtenerMisCuentas = async (token: string) => {
    return await axios.get('/api/cuentas/misCuentas', {
        headers: { Authorization: `Bearer ${token}` },
    });*/
export const obtenerCuentaPorCliente = async (token: string) => {
    return await axios.get('/api/cuentas/por-cliente', {
        headers: { Authorization: `Bearer ${token}` },
    });
};
