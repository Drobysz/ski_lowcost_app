"use server"

import { cookies } from 'next/headers';
import { UserSession } from '@/interface/Session';

// Encryption
import { encrypt, decrypt } from './encrypt';

export async function createSession(access_token: string, refresh_token: string ) {
    console.log("Creating session with access token:", access_token.slice(0, 10) + "...");
    console.log("Creating session with refresh token:", refresh_token.slice(0, 10) + "...");
    const accessTokenExpiresAt = new Date(Date.now() + 1000 * 0.5 * 60 * 60 * 60); // 30 minutes
    const accessTokenSession = await encrypt({access_token});

    const refreshTokenExpiresAt = new Date(Date.now() + 1000 * 24 * 60 * 60 * 60 * 30); // 30 days
    const refreshTokenSession = await encrypt({refresh_token});

    const sessionStore = await cookies();

    sessionStore.set("access_token_session", accessTokenSession, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: accessTokenExpiresAt,
        path: "/"
    });

    sessionStore.set("refresh_token_session", refreshTokenSession, {
        httpOnly: true,
        secure: false,
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

    console.log(token ? `Found ${tokenTag} token in cookies.` : `No ${tokenTag} token found in cookies.`); // Debugging line   
    
    return token
        ? token[tokenTag + "_token"]
        : undefined;
};

export async function updateSession(sessionData: UserSession) {
    const sessionStore = await cookies();
    const session = await encrypt(sessionData);
    const expiresAt = new Date(Date.now() + 1000 * 4 * 60 * 60);

    sessionStore.set("session", session, {
        httpOnly: true,
        secure: false,
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