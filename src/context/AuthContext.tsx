import React, {
    createContext, useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

interface Usuario {
    nombre: string;
    apellido: string;
    mail: string;
    tipo_cliente: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    rol: string | null;
    user: Usuario | null;  // usuario agregado aquí
    login: (token: string, rol: string, user: Usuario) => void;  // login recibe user
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() =>
        sessionStorage.getItem("token")
    );
    const [rol, setRol] = useState<string | null>(() =>
        sessionStorage.getItem("rol")
    );
    const [user, setUser] = useState<Usuario | null>(() => {
        const userJson = sessionStorage.getItem("user");
        return userJson ? JSON.parse(userJson) : null;
    });

    const isAuthenticated = !!token;

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedRol = sessionStorage.getItem("rol");
        const userJson = sessionStorage.getItem("user");  // cargar user también
        setToken(storedToken);
        setRol(storedRol);
        setUser(userJson ? JSON.parse(userJson) : null);
    }, []);

    const login = (token: string, userRol: string, userData: Usuario) => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("rol", userRol);
        sessionStorage.setItem("user", JSON.stringify(userData));  // guardar user
        setToken(token);
        setRol(userRol);
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("rol");
        sessionStorage.removeItem("user");  // borrar user también
        setToken(null);
        setRol(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, rol, user, login, logout }} // agrego user aquí
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};