import { deleteSession, getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";

export async function POST() {
    const refreshToken = await getToken("refresh");

    if (!refreshToken) {
        return new Response("No refresh token found", { status: 400 });
    }

    const accessToken = await getToken("access");

    if (!accessToken) {
        return new Response("No access token found", { status: 400 });
    }

    const res = await fetch(apiBaseUrl + '/auth/logout', {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache: "no-store",
        body: JSON.stringify({
            refresh_token: refreshToken
        })
    });

    if (!res.ok) {
        return new Response("Failed to log out", { status: 500 });
    }

    await deleteSession();

    return new Response("Logged out successfully", { status: 200 });
} 
