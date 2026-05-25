"use server"

// Props
import {
    LoginTokensInterface,
    SkiingLvl
} from "@/interface";

// Helpers
import { logInQuery, regQuery } from "@/queries/auth_queries/authQueries";
import { createSession } from "./sessions/sesssions";

// FormScheme
import {
    RegisterFormScheme,
    LoginFormScheme,
    FormState,
    UpdateFormScheme
} from "@/auth/FormSchemes";

// Form data parse tool
import { z } from "zod";
import { cookies } from "next/headers";

export async function updateAction(_:FormState, formData: FormData) {
    const parsed = UpdateFormScheme.safeParse({
        first_name:     formData.get("first_name"),
        last_name:      formData.get("last_name"),
        age:            formData.get("age"),
        address:        formData.get("address"),
        birth_date:     formData.get("birth_date"),
        tel:            formData.get("tel"),
        skiing_level:   formData.get("skiing_level"),
        height:         formData.get("height"),
        weight:         formData.get("weight"),
        shoe_size:      formData.get("shoe_size"),
        password:       formData.get("password"),
    });

    if (!parsed.success) {
        const errors = z.flattenError(parsed.error).fieldErrors;

        return { 
            errors: {
                first_name: errors.first_name?.[0],
                last_name: errors.last_name?.[0],
                age: errors.age?.[0],
                address: errors.address?.[0],
                birth_date: errors.birth_date?.[0],
                tel: errors.tel?.[0],
                skiing_level: errors.skiing_level?.[0],
                height: errors.height?.[0],
                weight: errors.weight?.[0],
                shoe_size: errors.shoe_size?.[0],
                password: errors.password?.[0],
            }
        }
    }

    const filledFields = Object.fromEntries(
        Object.entries(parsed.data).filter(([, v])=> v !== undefined)
    );
    const cookieStore = await cookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/post?item=me&method=PATCH`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(filledFields),
    });

    console.log(res.status)

    if (!res.ok) {
        return {
            errors: {},
            message: res.statusText,
            success: false
        }
    }

    return { success: true }
}

export async function loginAction (_: FormState, formData: FormData) {
    const parsed = LoginFormScheme.safeParse({
        tel:        formData.get('tel'),
        password:   formData.get('password')
    });

    if (!parsed.success) {
        const errors = z.flattenError(parsed.error).fieldErrors;

        return { 
            errors: {
                tel:      errors.tel?.[0],
                password: errors.password?.[0],
            }
        }
    }

    const res = await logInQuery(parsed.data.tel, parsed.data.password);

    if (!res.ok) {
        return {
            errors: {
                tel: res.message,
            },
            message: res.message,
            success: false,
        }
    }
    const data: LoginTokensInterface = res.data;

    await createSession(
        data.access_token,
        data.refresh_token
    );

    return { success : true };
};

export async function registerAction (_: FormState, formData: FormData) {
    const parsed = RegisterFormScheme.safeParse({
        first_name:     formData.get("first_name"),
        last_name:      formData.get("last_name"),
        age:            formData.get("age"),
        address:        formData.get("address"),
        birth_date:     formData.get("birth_date"),
        tel:            formData.get("tel"),
        skiing_level:   formData.get("skiing_level"),
        height:         formData.get("height"),
        weight:         formData.get("weight"),
        shoe_size:      formData.get("shoe_size"),
        password:       formData.get("password"),
    });

    if (!parsed.success) {
        const errors = z.flattenError(parsed.error).fieldErrors;

        return { 
            errors: {
                first_name: errors.first_name?.[0],
                last_name: errors.last_name?.[0],
                age: errors.age?.[0],
                address: errors.address?.[0],
                birth_date: errors.birth_date?.[0],
                tel: errors.tel?.[0],
                skiing_level: errors.skiing_level?.[0],
                height: errors.height?.[0],
                weight: errors.weight?.[0],
                shoe_size: errors.shoe_size?.[0],
                password: errors.password?.[0],
            }
        }
    }

    const regRes = await regQuery({
        first_name:     parsed.data.first_name,
        last_name:      parsed.data.last_name,
        age:            parsed.data.age,
        address:        parsed.data.address,
        birth_date:     parsed.data.birth_date,
        tel:            parsed.data.tel,
        skiing_level:   parsed.data.skiing_level as SkiingLvl,
        height:         parsed.data.height,
        weight:         parsed.data.weight,
        shoe_size:      parsed.data.shoe_size,
        password:       parsed.data.password,
});

    if (!regRes.ok) {
        return {
            success: false,
            message: regRes.message
        }
    }

    const logRes = await logInQuery(
        parsed.data.tel,
        parsed.data.password,
    );

    if (!logRes.ok) {
        return {
            success: false,
            message: 'Account created, but sign-in failed. Please log in with your phone number.'
        }
    }

    const data: LoginTokensInterface = logRes.data;

    await createSession(
        data.access_token,
        data.refresh_token
    );

    return { success : true };
};
