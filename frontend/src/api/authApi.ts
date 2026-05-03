import { apiClient } from "./axios";
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    MeResponse,
} from "../types/auth";

export async function login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);
    return response.data;
}

export async function registerUser(
    payload: RegisterRequest
): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload);
    return response.data;
}

export async function getCurrentUser(): Promise<MeResponse> {
    const response = await apiClient.get<MeResponse>("/auth/me");
    return response.data;
}