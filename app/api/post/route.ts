import { NextResponse } from "next/server";
import { getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { refreshAccessToken } from "@/queries/auth_queries/tokenQueries";
import { failedToFetch, unauthorizedResponse } from "@/queries/statusResponses";

async function postItem<TBody extends object>(
	body: TBody, 
	accessToken: string, 
	endpoint: string,
	method: string,
	frontendOrigin: string
) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
		return await fetch(`${apiBaseUrl}/${endpoint}`, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Bearer ${accessToken}`,
				"X-Frontend-Origin": frontendOrigin,
			},
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

	if (!accessToken) {
		return unauthorizedResponse();
	}

	let res: Response;

	try {
		res = await postItem(body, accessToken, endpoint, method, frontendOrigin);
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
			res = await postItem(body, refreshedAccessToken, endpoint, method, frontendOrigin);
		} catch {
			return failedToFetch();
		}
	}

	if (!res.ok) {
		return failedToFetch(res.statusText, res.status);
	}

    return res;
}
