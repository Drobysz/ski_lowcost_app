import { NextResponse } from "next/server";
import { getToken } from "@/auth/sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";

export async function GET() {
    const accessToken = await getToken("access");

    if (!accessToken) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const res = await fetch(`${apiBaseUrl}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        cache: "no-store",
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
