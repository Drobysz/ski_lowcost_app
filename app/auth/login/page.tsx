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
        setIsLoggedIn,
        setNotification
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
        if (state.message !== undefined) {
            if (state.success) {
                setNotification({
                    status: "success",
                    text: "Successfully logged in"
                });
            } else {
                setNotification({
                    status: "error",
                    text: "Failed to log in"
                });
            }
        }

        if(state.success) {
            setIsLoggedIn("auth");
        }
    }, [setIsLoggedIn, setNotification, state.success, state]);

    useEffect(() => {
        if (isLoggedIn !== "auth") return;

        mutate("access_token_session");
        router.push('/');
    }, [isLoggedIn, router]);

    return (
        <section className={s.login_form_markup}>
            <Background />
            <form
                action={action}
                className={s.form}
                noValidate
            >
                <Title />
                <Forms errors={state.errors} />
                {state.message ? (
                    <p className="text-sm text-red-600" role="alert">
                        {state.message}
                    </p>
                ) : null}
                <SubmitBtn
                    isFilled={isFilled}
                    pending={pending}
                />
            </form>
        </section> 
    )
}
