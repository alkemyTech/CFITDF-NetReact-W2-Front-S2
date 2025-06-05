import React, {
 createContext,    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    rol: string | null;
    login: (token: string, rol: string) => void;
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

    const isAuthenticated = !!token;

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedRol = sessionStorage.getItem("rol");
        setToken(storedToken);
        setRol(storedRol);
    }, []);

    const login = (token: string, userRol: string) => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("rol", userRol);
        setToken(token);
        setRol(userRol);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("rol");
        setToken(null);
        setRol(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, rol, login, logout }}
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