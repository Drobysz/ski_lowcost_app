import { AuthStatus } from "@/interface";

export async function getAuthStatus(): Promise<AuthStatus> {
    try {
        const res = await fetch("/api/auth/status");
        const { isLoggedIn } = await res.json();
        return isLoggedIn;
    } catch {
        return "no_auth";
    }
}