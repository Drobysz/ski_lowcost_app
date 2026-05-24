import { getToken } from "@/auth/sessions/sesssions";
import { refreshAccessToken } from "@/queries";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { failedToFetch, unauthorizedResponse } from "@/queries/statusResponses";
import { NextResponse } from "next/server";

async function fetchReserves(accessToken: string) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
        return await fetch(`${apiBaseUrl}/reservations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            cache: "no-store",
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function GET() {
    const accessToken = await getToken("access") ?? await refreshAccessToken();

    if (!accessToken) return unauthorizedResponse();

    let res: Response;

    try {
        res = await fetchReserves(accessToken);
    } catch {
        return failedToFetch() 
    }

    if (res.status === 401) {
        const refreshedAccessToken = await refreshAccessToken();

        if (!refreshedAccessToken) {
            return unauthorizedResponse();
        }

        try {
            res = await fetchReserves(refreshedAccessToken);
        } catch {
            return failedToFetch();
        }
    }

    if (!res.ok) {
        return failedToFetch(res.statusText, res.status);
    }

    const data = await res.json().catch(() => null);
    return NextResponse.json(data);
}
