import { SkiingLvl } from "@/interface";
import apiBaseUrl from "../apiBaseUrl";

export interface RegQueryProps {
    first_name: string;
    last_name: string;
    age: number;
    address: string;
    birth_date: string;
    tel: string;
    skiing_level: SkiingLvl;
    height: number;
    weight: number;
    shoe_size: number;
    password: string;
}

export async function logInQuery(
    tel: string, password: string
) {
    const res = await fetch(apiBaseUrl + '/auth/login', {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            tel: tel,
            password: password
        }),
        cache: "no-store"
    });

    if (!res.ok) {
        return {
            isLoggedIn: false,
            message: res.status == 409
                ? "Credentials are incorrect"
                : "Server error",
            status: res.status
        };
    }

    const data = await res.json().catch(() => null);

    return {
        isLoggedIn: true,
        data: data,
        status: res.status
    };
}

export async function regQuery({
    first_name,
    last_name,
    age,
    address,
    birth_date,
    tel,
    skiing_level,
    height,
    weight,
    shoe_size,
    password,
}: RegQueryProps) {
    const res = await fetch(apiBaseUrl + '/clients', {
        method: "POST",
        headers:{ "Content-Type" : "application/json" },
        body: JSON.stringify({
            body: JSON.stringify({
                first_name,
                last_name,
                age,
                address,
                birth_date,
                tel,
                skiing_level,
                height,
                weight,
                shoe_size,
                password,
            }),
        }),
        cache: "no-store"
    });

    if (!res.ok) {
        return {
            isRegistered: res.ok,
            message: res.status == 409
                ? "This email has been already taken"
                : "Failed to register/Server error",
            status: res.status
        };
    }

    return {
        status: res.status,
        isRegistered: res.ok,
        message: "Succeeded to register"
    }
}