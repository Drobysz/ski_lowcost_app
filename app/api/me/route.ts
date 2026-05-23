import { NextResponse } from "next/server";
import { getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { refreshAccessToken } from "@/queries/auth_queries/tokenQueries";

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

function unauthorizedResponse() {
	return NextResponse.json(
		{ message: "Unauthorized" },
		{ status: 401 }
	);
}

export async function GET() {
    const accessToken = await getToken("access") ?? await refreshAccessToken();

	if (!accessToken) {
		return unauthorizedResponse();
	}

	let res: Response;

	try {
		res = await fetchProfile(accessToken);
	} catch {
		return NextResponse.json({
			message: "Failed to fetch user profile",
			status: 500
		}, { status: 500 });
	}

	if (res.status === 401) {
		const refreshedAccessToken = await refreshAccessToken();

		if (!refreshedAccessToken) {
			return unauthorizedResponse();
		}

		try {
			res = await fetchProfile(refreshedAccessToken);
		} catch {
			return NextResponse.json({
				message: "Failed to fetch user profile",
				status: 500
			}, { status: 500 });
		}
	}

	if (!res.ok) {
		return NextResponse.json(
			{
				message: res.statusText || "Failed to fetch user profile",
				status: res.status || 500
			},
			{ status: res.status || 500 }
		);
	}

    const data = await res.json().catch(() => null);
    return NextResponse.json(data);
}
