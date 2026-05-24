import apiBaseUrl from "@/queries/apiBaseUrl";
import { failedToFetch } from "@/queries/statusResponses";
import { NextResponse } from "next/server";

export async function GET() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);
    let res: Response;

    try {
        res = await fetch(`${apiBaseUrl}/rooms?page=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
        });
    } catch {
        return failedToFetch();
    } finally {
        clearTimeout(timeoutId);
    }

    if (!res.ok) {
        return failedToFetch();
    }

    const data = await res.json().catch(() => null);
    return NextResponse.json(data);
}
