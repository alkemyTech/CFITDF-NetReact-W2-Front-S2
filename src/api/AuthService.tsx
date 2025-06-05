const BASE_URL = "https://localhost:7153/api/Auth";

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
//parseo de JSON, para scar un mensaje claro 
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
    const res = await fetch(`${BASE_URL}/register`, {
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