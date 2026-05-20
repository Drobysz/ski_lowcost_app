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
    FormState
} from "@/auth/FormSchemes";

// Form data parse tool
import { z } from "zod";

export async function loginAction (_: FormState, formData: FormData) {
    console.log("formData:", Object.fromEntries(formData));

    const parsed = LoginFormScheme.safeParse({
        tel:        formData.get('tel'),
        password:   formData.get('password')
    });

    console.log("parsed:", parsed);

    if (!parsed.success) {
        const errors = z.flattenError(parsed.error).fieldErrors;

        return { 
            errors: {
                tel:      errors.tel?.[0],
                password: errors.password?.[0],
            }
        }
    }

    const res = await logInQuery(
        formData.get("tel") as string, 
        formData.get("password") as string, 
    );

    console.log("status:", res.status);

    if (!res.isLoggedIn) {
        return {
            errors: {
                tel: "Incorrect credentials",
                password: "Incorrect credentials"
            }
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
        first_name:     formData.get("first_name") as string,
        last_name:      formData.get("last_name") as string,
        age:            Number(formData.get("age")),
        address:        formData.get("address") as string,
        birth_date:     formData.get("birth_date") as string,
        tel:            formData.get("tel") as string,
        skiing_level:   formData.get("skiing_level") as SkiingLvl,
        height:         Number(formData.get("height")),
        weight:         Number(formData.get("weight")),
        shoe_size:      Number(formData.get("shoe_size")),
        password:       formData.get("password") as string,
});

    console.log("reg status:", regRes.status);
    console.log("regRes:", regRes);

    if (!regRes.isRegistered) {
        return {
            success: false,
            message: 'Failed to register'
        }
    }

    const logRes = await logInQuery(
        formData.get("email") as string, 
        formData.get("password") as string,
    );

    if (!logRes.isLoggedIn) {
        return {
            success: false,
            message: 'Failed to log in'
        }
    }

    console.log("log status:", logRes.status);

    const data: LoginTokensInterface = logRes.data;

    await createSession(
        data.access_token,
        data.refresh_token
    );

    return { success : true };
};