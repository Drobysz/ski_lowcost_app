import apiBaseUrl from "@/queries/apiBaseUrl";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`${apiBaseUrl}/rooms?page=1`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        next: {
            revalidate: 3600
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