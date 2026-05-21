"use server"

import { redirect } from "next/navigation";
import { deleteSession, getToken } from "../sessions/sesssions";
import apiBaseUrl from "@/queries/apiBaseUrl";

async function revokeBackendSession() {
    const accessToken = await getToken("access");
    const refreshToken = await getToken("refresh");

    if (!accessToken || !refreshToken) {
        return;
    }

    await fetch(apiBaseUrl + "/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        cache: "no-store",
    }).catch((error) => {
        console.error("Failed to revoke backend session.", error);
    });
}

export async function logoutClient () {
    await logout();
}

export async function logoutServer () {
    await logout();
}

export async function logout () {
    await revokeBackendSession();
    await deleteSession();
    redirect('/auth/login');
}
