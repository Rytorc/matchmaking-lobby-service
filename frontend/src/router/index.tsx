import type { ReactNode } from "react";
import { NavBar } from "../components/layout/NavBar";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { DashboardPage } from "../pages/DashboardPage";

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RootLayout>
                <Navigate to="/dashboard" replace />
            </RootLayout>
        ),
    },
    {
        path: "/login",
        element: (
            <RootLayout>
                <LoginPage />
            </RootLayout>
        ),
    },
    {
        path: "/register",
        element: (
            <RootLayout>
                <RegisterPage />
            </RootLayout>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <RootLayout>
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            </RootLayout>
        ),
    },
])