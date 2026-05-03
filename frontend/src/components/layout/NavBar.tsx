import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function NavBar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link to="/" className="font-bold">
                    Matchmaking Lobby
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated && user ? (
                        <>
                            <span className="text-sm text-gray-600">
                                {user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="rounded bg-gray-900 px-3 py-2 text-sm text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm">
                                Login
                            </Link>
                            <Link to="/register" className="text-sm">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}