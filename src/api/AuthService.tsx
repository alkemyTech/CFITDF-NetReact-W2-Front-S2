const BASE_URL = "https://localhost:7153/api/Usuarios";
const MOVIMIENTOS_URL = "https://localhost:7153/api/Movimientos";
const REGISTER_URL = "https://localhost:7153/api/Auth/register";
const PERFIL_URL = "https://localhost:7153/api/Usuarios"
const Base_URL1 = "https://localhost:7153/api/Usuarios";       

import axios from "axios";
export interface RegisterRequest {
    Nombre: string;
    Apellido: string;
    Mail: string;
    Direccion: string;
    Telefono: string;
    Password: string;
    Tipo_cliente: string;
}

export interface LoginDTO {
    mail: string;
    Password: string;
}
// NUEVO: DTO para movimientos por rango
export interface RangoFechasMovDTO {
    fechaDesde: string;
    fechaHasta: string;
}

// parseo de JSON para sacar un mensaje claro
const checkResponse = async (res: Response) => {
    if (!res.ok) {
        let errorMessage = 'Error en la solicitud';
        try {
            const data = await res.json();
            if (data.message) errorMessage = data.message;
            else errorMessage = JSON.stringify(data);
        } catch {
            errorMessage = await res.text();    
        }
        throw new Error(errorMessage);
    }
    return res.json();
};

export const register = async (data: RegisterRequest) => {
    const res = await fetch(`${REGISTER_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return checkResponse(res);
};

export const login = async (data: LoginDTO) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return checkResponse(res);
};


export const getPerfil = async (token: string) => {
    const res = await fetch(`${Base_URL1}/perfil`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener perfil');
    }
    const data = await res.json();
    console.log("Perfil recibido del backend:", data);
    return data; // devuelve { nombre, nro_cuenta, saldo, cbu }
};
export const getResumenPorRango = async (token: string, rango: RangoFechasMovDTO) => {
    const res = await fetch(`${MOVIMIENTOS_URL}/resumen`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rango),
    });
    return checkResponse(res);

    
};
export const updatePerfil = async (token: string, updateData: any) => {
    try {
        const response = await fetch(`${PERFIL_URL}/basic-profile`, {  // <== aquí
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
        });

        if (response.status === 204) {
            return true;
        } else {
            console.error("Error al actualizar perfil:", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Error en updatePerfil:", error);
        return false;
    }
};