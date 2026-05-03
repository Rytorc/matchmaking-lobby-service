import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";
import { getCurrentUser, login, registerUser } from "../api/authApi";



type AuthContextValue = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginUser: (payload: LoginRequest) => Promise<void>;
    registerNewUser: (payload: RegisterRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(() => 
        localStorage.getItem("auth_token")
    );
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = Boolean(token && user);

    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await getCurrentUser();
                setUser(response.user);
            } catch {
                localStorage.removeItem("auth_token");
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, [token])

    async function loginUser(payload: LoginRequest) {
        const response = await login(payload);

        localStorage.setItem("auth_token", response.token);
        setToken(response.token);
        setUser(response.user);
    }

    async function registerNewUser(payload: RegisterRequest) {
        const response = await registerUser(payload);

        localStorage.setItem("auth_token", response.token);
        setToken(response.token);
        setUser(response.user);
    }

    function logout() {
        localStorage.removeItem("auth_token")
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                isLoading,
                loginUser,
                registerNewUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}