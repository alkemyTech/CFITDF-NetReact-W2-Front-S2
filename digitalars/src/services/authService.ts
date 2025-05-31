const BASE_URL = "http://localhost:5044/api/auth";

export interface RegisterRequest {
    
    Nombre: string;
    Apellido: string;
    
    mail: string;
    Direccion: string;
    Telefono: string;
    Password: string;
    Tipo_cliente: string;
}

export interface LoginDTO {
    mail: string;
    Password: string;
}

export const register = async (data: RegisterRequest) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const login = async (data: LoginDTO) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};
