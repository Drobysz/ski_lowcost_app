import { createSession, deleteSession, getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "../apiBaseUrl";

export const getRefreshedTokens = async () => {
    const refreshToken = await getToken("refresh");

    if (!refreshToken) {
        return {
            ok: false,
            message: "Refresh token was expired",
            status: 401
        }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch(`${apiBaseUrl}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
            cache: "no-store",
            signal: controller.signal,
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
    } catch {
        return {
            ok: false,
            message: "Failed to refresh token/Server error",
            status: 500,
        };
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function refreshAccessToken() {
    const refreshedTokensRes = await getRefreshedTokens();
    
    if (!refreshedTokensRes.ok) {
        await deleteSession();
        return null;
    }

    const { access_token, refresh_token } = refreshedTokensRes.data;
    await createSession(access_token, refresh_token);

    return access_token;
}