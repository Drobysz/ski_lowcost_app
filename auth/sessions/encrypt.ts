import "server-only";
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export type SessionPayload = JWTPayload & {
  access_token?: string;
  refresh_token?: string;
};

function getEncodedKey() {
  const secretKey = process.env.SESSION_SECRET;

  if (!secretKey) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return new TextEncoder().encode(secretKey);
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4h')
    .sign(getEncodedKey())
}
 
export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | undefined> {
  if (!session) {
    return undefined;
  }

  try {
    const { payload } = await jwtVerify(session, getEncodedKey(), {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error(`Failed to verify session. Error: ${String(error)}`)
  }
}
