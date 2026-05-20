import "server-only";
import { SignJWT, jwtVerify } from 'jose';
import { UserSession } from '@/interfaces/UserData.interface';
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: UserSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4h')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = ''): Promise<UserSession | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log(`Failed to verify session. Error: ${String(error)}`)
  }
}