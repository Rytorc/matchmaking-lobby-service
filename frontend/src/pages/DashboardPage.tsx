import { PageContainer } from "../components/layout/PageContainer";
import { useAuth } from "../context/AuthContext";

export function DashboardPage() {
    const { user } = useAuth();

    return (
        <PageContainer>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h1 className="mb-4 text-2xl font-bold">Player Dashboard</h1> 
                
                {user ? (
                    <div className="space-y-2">
                        <p>
                            <span className="font-medium">Username:</span> {user.username}
                        </p>
                        <p>
                            <span className="font-medium">MMR:</span> {user.mmr}
                        </p>
                        <p>
                            <span className="font-medium">Status:</span> {user.status}
                        </p>
                    </div>
                ) : (
                    <p>No user loaded.</p>
                )};
            </div>
        </PageContainer>
    );
}