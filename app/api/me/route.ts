import { NextResponse } from "next/server";
import { createSession, getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";
import { getRefreshedTokens } from "@/queries/auth_queries/tokenQueries";

export async function GET() {
    const accessToken = await getToken("access");

	if (!accessToken) {
		const refreshToken = await getToken("refresh");

		if (!refreshToken) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const refreshedTokensRes = await getRefreshedTokens();
		
		if (!refreshedTokensRes.ok) {
			return NextResponse.json(
				{ message: refreshedTokensRes.message },
				{ status: refreshedTokensRes.status }
			);
		}

		const { access_token, refresh_token } = refreshedTokensRes.data;
		await createSession(access_token, refresh_token);
	}

    const res = await fetch(`${apiBaseUrl}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        return NextResponse.json({
            message: res.statusText || "Failed to fetch user profile",
            status: res.status || 500
        }, { status: res.status || 500 });
    }

    const data = await res.json().catch(() => null);
    return NextResponse.json(data);
}
