import { getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "../apiBaseUrl";

export const getRefreshedTokens = async () => {
    const refreshToken = await getToken("refresh");

    const res = await fetch(`${apiBaseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        cache: "no-store",
    });

    if (!res.ok) {
        console.error("Failed to refresh token:", res.status);
        return {
            ok: false,
            message: res.status === 401
                ? "Refresh token is invalid or expired"
                : "Failed to refresh token/Server error",
            status: res.status,
        };
    }

    const data = await res.json().catch(() => null);
    return {
        ok: true,
        data: data,
        status: res.status,
    };
}