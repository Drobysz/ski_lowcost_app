import { NextResponse } from "next/server";
import { getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { refreshAccessToken } from "@/queries/auth_queries/tokenQueries";
import { UserProfileForm } from "@/interface";
import { failedToFetch, succeeded, unauthorizedResponse } from "@/queries/statusResponses";

async function fetchProfile(accessToken: string) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
		return await fetch(`${apiBaseUrl}/profile`, {
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

async function postProfile(filledFields: UserProfileForm, accessToken: string) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
		return await fetch(`${apiBaseUrl}/profile`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Bearer ${accessToken}`,
			},
			body: JSON.stringify(filledFields),
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

export async function GET() {
    const accessToken = await getToken("access") ?? await refreshAccessToken();

	if (!accessToken) return unauthorizedResponse();

	let res: Response;

	try {
		res = await fetchProfile(accessToken);
	} catch {
		return failedToFetch() 
	}

	if (res.status === 401) {
		const refreshedAccessToken = await refreshAccessToken();

		if (!refreshedAccessToken) {
			return unauthorizedResponse();
		}

		try {
			res = await fetchProfile(refreshedAccessToken);
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

export async function PATCH(request: Request) {
	const data = await request.json();

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	const accessToken = await getToken("access") ?? await refreshAccessToken();

	if (!accessToken) {
		return unauthorizedResponse();
	}

	let res: Response;

	try {
		res = await postProfile(data as UserProfileForm, accessToken);
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
			res = await postProfile(data as UserProfileForm, accessToken);
		} catch {
			return failedToFetch();
		}
	}

	if (!res.ok) {
		return failedToFetch(res.statusText, res.status);
	}

    return succeeded();
}