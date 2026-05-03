export type User = {
    id: number;
    username: string;
    mmr: number;
    status: string;
}

export type LoginRequest = {
    username: string;
    password: string;
}

export type RegisterRequest = {
    username: string;
    password: string;
}

export type AuthResponse = {
    success: boolean;
    token: string;
    user: User;
}

export type MeResponse = {
    success: boolean;
    user: User;
}