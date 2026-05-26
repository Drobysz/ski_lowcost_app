import { NextResponse } from "next/server";
import { getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { refreshAccessToken } from "@/queries/auth_queries/tokenQueries";
import { failedToFetch, unauthorizedResponse } from "@/queries/statusResponses";

async function postItem<TBody extends object>(
	body: TBody, 
	endpoint: string,
	method: string,
	frontendOrigin: string,
	accessToken?: string,
	isTokenNeeded: boolean = true
) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	const headersNoneAuth = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"X-Frontend-Origin": frontendOrigin
	}
	const bearerToken = { "Authorization": `Bearer ${accessToken}`, };

	const headers = isTokenNeeded ? {...headersNoneAuth, ...bearerToken} : headersNoneAuth;

	try {
		return await fetch(`${apiBaseUrl}/${endpoint}`, {
			method: method,
			headers: headers,
			body: JSON.stringify(body),
			cache: "no-store",
			signal: controller.signal,
		});
	} catch {
		return NextResponse.json({
			message: "Failed to fetch user profile",
			status: 500
		}, { status: 500 });
	} finally {
		clearTimeout(timeoutId);
	}
}

export async function PATCH(request: Request) {
	const { searchParams } = new URL(request.url);
	const frontendOrigin = new URL(request.url).origin;
    const item = searchParams.get("item") ?? "";
	const authMsg = searchParams.get("auth") ?? "token";
	const isTokenNeeded = authMsg == "token";
	const method = searchParams.get("method") ?? "";
    const endpointLib = {
        available: "rooms/available",
        me: "profile",
        reservations: "reservations",
        stripeCheckout: "stripe/checkout"
    }

	const endpoint = endpointLib[item as keyof typeof endpointLib]; 
	const body = await request.json();

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	const accessToken = await getToken("access") ?? await refreshAccessToken();

	if (!accessToken && isTokenNeeded) {
		return unauthorizedResponse();
	}

	let res: Response;

	try {
		res = await postItem(body, endpoint, method, frontendOrigin, accessToken, isTokenNeeded);
	} catch {
		return failedToFetch();
	} finally {
		clearTimeout(timeoutId);
	}

	if (res.status === 401) {
		const refreshedAccessToken = await refreshAccessToken();

		if (!refreshedAccessToken) {
			return unauthorizedResponse();
		}

		try {
			res = await postItem(body, endpoint, method, frontendOrigin, accessToken, isTokenNeeded);
		} catch {
			return failedToFetch();
		}
	}

	if (!res.ok) {
		return failedToFetch(res.statusText, res.status);
	}

    return res;
}
