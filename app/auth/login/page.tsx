'use client';

import s from "./markup.module.scss";
import {
    Background,
    Title,
    Forms,
    SubmitBtn
} from "./_components/index";
import { useActionState, useContext, useEffect } from "react";
import { FormState } from "@/auth/FormSchemes";
import { loginAction } from "@/auth/actions";
import { AuthContext } from "../context/auth.context";
import { GlobalContext } from "@/app/context/global.context";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function LoginPage() {
    const router = useRouter();
    
    const { 
        isLoggedIn,
        setIsLoggedIn
    } = useContext(GlobalContext);
    const {
        logFormData
    } = useContext(AuthContext);

    const isFilled = Object.values(logFormData).every(value => value.trim() !== "");

    const [state, action, pending] = 
        useActionState<FormState, FormData>(
            loginAction, 
            { errors: {} }
        );
    
    useEffect(() => {
        if(state.success) {
            setIsLoggedIn("auth");
        }
    }, [state.success]);

    useEffect(() => {
        if (isLoggedIn !== "auth") return;

        mutate("access_token_session");
        router.push('/rooms');
    }, [isLoggedIn]);

    return (
        <section className={s.login_form_markup}>
            <Background />
            <form
                action={action}
                className={s.form}
            >
                <Title />
                <Forms />
                <SubmitBtn
                    isFilled={isFilled}
                    pending={pending}
                />
            </form>
        </section> 
    )
}