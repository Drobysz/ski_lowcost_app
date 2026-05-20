"use server"

// Helpers
import { logOutQuery } from "@/queries/auth_queries/authQueries";
import { deleteSession } from "../sessions/sesssions";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";


export async function logoutClient (formData: FormData) {
    const token = formData.get('token') as string;
    await logout(token);
}

export async function logoutServer (token: string) {
    await logout(token);
}

export async function logout (token: string) {
    const res = await logOutQuery(token);
    const locale = await getLocale();

    if (res.status === 200) {
        await deleteSession();
        redirect({
            href: '/login',
            locale: locale
        });
    } else {
        console.log('unsuccessful logout');
    }
}