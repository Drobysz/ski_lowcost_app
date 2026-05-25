import { getToken } from "@/auth/sessions/sesssions";
import { refreshAccessToken } from "@/queries";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { failedToFetch, unauthorizedResponse } from "@/queries/statusResponses";
import { NextResponse } from "next/server";

async function fetchReserves(accessToken: string, endpoint: string) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
        return await fetch(`${apiBaseUrl}/${endpoint}`, {
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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const item = searchParams.get("item") ?? "";
    const search = searchParams.get("search")?.trim() ?? "";

    const endpointLib = {
        reserves: "reservations",
        me: "profile",
        users: "users"
    }

    let endpoint =
        item in endpointLib
            ? endpointLib[item as keyof typeof endpointLib]
            : ""; 

    if (item === "users" && search) {
        endpoint += `?${new URLSearchParams({ search }).toString()}`;
    }

    const accessToken = await getToken("access") ?? await refreshAccessToken();

    if (!accessToken) return unauthorizedResponse();

    let res: Response;

    try {
        res = await fetchReserves(accessToken, endpoint);
    } catch {
        return failedToFetch() 
    }

    if (res.status === 401) {
        const refreshedAccessToken = await refreshAccessToken();

        if (!refreshedAccessToken) {
            return unauthorizedResponse();
        }

        try {
            res = await fetchReserves(refreshedAccessToken, endpoint);
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
