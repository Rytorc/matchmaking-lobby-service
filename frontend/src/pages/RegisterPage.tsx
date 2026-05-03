import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, type SubmitEventHandler } from "react";
import { PageContainer } from "../components/layout/PageContainer";

export function RegisterPage() {
    const navigate = useNavigate();
    const { registerNewUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            await registerNewUser({ username, password });
            navigate("/dashboard");
        } catch {
            setErrorMessage("Registration failed. Username may already exist.");
        }
    }

    return (
        <PageContainer>
            <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold">Register</h1> 
                
                {errorMessage && (
                    <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Username
                        </label>
                        <input
                            className="w-full rounded border px-3 py-2"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            className="w-full rounded border px-3 py-2"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-gray-900 ps-4 py-2 text-white"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link className="font-medium underline" to="/login">
                    </Link>
                </p>
            </div>
        </PageContainer>
    );
}