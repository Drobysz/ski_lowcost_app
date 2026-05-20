import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw NextResponse.json({
            message: res.statusText || "Failed to fetch user profile",
            status: res.status || 500
        }, { status: res.status || 500 });
    }

    const data = res.json().catch(() => null);
    return data;
}