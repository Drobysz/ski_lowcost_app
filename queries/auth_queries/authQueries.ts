import type {
    ApiErrorResponse,
    ClientLoginRequest,
    RegisterClientRequest,
    RegisterResponse,
    TokenPair,
} from "@/interface";
import apiBaseUrl from "../apiBaseUrl";

export type AuthQueryResult<T> =
    | {
        ok: true;
        data: T;
        status: number;
      }
    | {
        ok: false;
        message: string;
        status: number;
      };

async function parseApiError(res: Response, fallback: string) {
    const payload = await res.json().catch(() => null) as ApiErrorResponse | null;

    if (payload?.errors) {
        const validationMessages = Object.values(payload.errors)
            .flat()
            .filter(Boolean);

        if (validationMessages.length) {
            return validationMessages.join(" ");
        }
    }

    return payload?.message ?? fallback;
}

export async function logInQuery(
    tel: string, password: string
): Promise<AuthQueryResult<TokenPair>> {
    const payload: ClientLoginRequest = { tel, password };

    const res = await fetch(apiBaseUrl + '/auth/login', {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        cache: "no-store"
    });

    if (!res.ok) {
        return {
            ok: false,
            message: await parseApiError(res, "Unable to sign in. Please check your credentials."),
            status: res.status
        };
    }

    const data = await res.json().catch(() => null) as TokenPair | null;

    if (!data?.access_token || !data?.refresh_token) {
        return {
            ok: false,
            message: "The login response did not include session tokens.",
            status: res.status,
        };
    }

    return {
        ok: true,
        data: data,
        status: res.status
    };
}

export async function regQuery(
    payload: RegisterClientRequest
): Promise<AuthQueryResult<RegisterResponse>> {
    const res = await fetch(apiBaseUrl + '/clients', {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        cache: "no-store"
    });

    if (!res.ok) {
        return {
            ok: false,
            message: await parseApiError(res, "Unable to create your account right now."),
            status: res.status
        };
    }

    const data = await res.json().catch(() => null) as RegisterResponse | null;

    if (!data?.data?.id) {
        return {
            ok: false,
            message: "The registration response did not include the created client id.",
            status: res.status,
        };
    }

    return {
        status: res.status,
        ok: true,
        data
    }
}
