"use server"

import { cookies } from 'next/headers';

// Encryption
import { encrypt, decrypt, type SessionPayload } from './encrypt';

export async function createSession(access_token: string, refresh_token: string ) {
    const accessTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 30);
    const accessTokenSession = await encrypt({access_token});

    const refreshTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const refreshTokenSession = await encrypt({refresh_token});
    const secure = process.env.NODE_ENV === "production";

    const sessionStore = await cookies();

    sessionStore.set("access_token_session", accessTokenSession, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        expires: accessTokenExpiresAt,
        path: "/"
    });

    sessionStore.set("refresh_token_session", refreshTokenSession, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        expires: refreshTokenExpiresAt,
        path: "/"
    });
};

export async function getToken(
    tokenTag: "access" | "refresh"
) {
    const sesstionStore = await cookies();

    const tokenTags = {
        "access": "access_token_session",
        "refresh": "refresh_token_session"
    }
    const hashed_value = sesstionStore.get(tokenTags[tokenTag])?.value;
    const token = await decrypt(hashed_value);
    
    return tokenTag === "access"
        ? token?.access_token
        : token?.refresh_token;
};

export async function updateSession(sessionData: SessionPayload) {
    const sessionStore = await cookies();
    const session = await encrypt(sessionData);
    const expiresAt = new Date(Date.now() + 1000 * 4 * 60 * 60);
    const secure = process.env.NODE_ENV === "production";

    sessionStore.set("session", session, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    });
};

export async function deleteSession() {
    const sessionStore = await cookies();
    sessionStore.delete('access_token_session');
    sessionStore.delete('refresh_token_session');
};
