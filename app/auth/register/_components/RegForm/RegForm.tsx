'use client'

import {
    Title,
    Forms,
    Terms,
    SubmitBtn
} from "./_components";
import cn from "classnames";
import s from "./style.module.scss";
import { registerAction } from "@/auth/actions";
import { useActionState, useContext, useEffect, useState } from "react";
import { FormState } from "@/auth/FormSchemes";
import { GlobalContext } from "@/app/context/global.context";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/context/auth.context";

export const RegForm = ({
    className
}: {
    className?: string
}) => {
    const router = useRouter();
    const [applied, setApplied] = useState(false);
    
    const { 
        isLoggedIn,
        setIsLoggedIn
    } = useContext(GlobalContext);
    const {
        regFormData
    } = useContext(AuthContext);

    const areFormsFilled = Object.values(regFormData).every(value => value.trim() !== "");

    const isFilled = 
        areFormsFilled
        &&
        applied;

    const [state, action, pending] = 
        useActionState<FormState, FormData>(
            registerAction, 
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

    return(
        <div className={cn(
            className,
           s.register_form
        )}>
            <Title />
            <form
                action={action}
                className="flex flex-col gap-4"
            >
                <Forms
                    errors={state.errors}
                />
                <Terms
                    checked={applied}
                    setChecked={setApplied}
                />
                <SubmitBtn
                    pending={pending}
                    isFilled={isFilled}
                />
            </form>
        </div>
    )
}