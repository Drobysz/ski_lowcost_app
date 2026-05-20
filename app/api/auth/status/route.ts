import { getToken } from "@/auth/sessions/sesssions";
import { NextResponse } from "next/server";

export async function GET() {
    const refreshToken = await getToken("refresh");

    return NextResponse.json({
        isLoggedIn: refreshToken ? true : false
    });
}