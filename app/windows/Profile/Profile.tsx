"use client";

import { useActionState, useContext, useEffect } from "react";
import s from "./style.module.scss";
import {
    Title,
    Forms,
    SaveBtn
} from "./_components"
import { FormState } from "@/auth/FormSchemes";
import { updateAction } from "@/auth/actions";
import { GlobalContext } from "@/app/context/global.context";

export const Profile = ()=> {
    const { 
        mutateUser,
        setNotification
     } = useContext(GlobalContext);

    const [state, action, pending] = 
        useActionState<FormState, FormData>(
            updateAction, 
            { errors: {} }
        );
    
    useEffect(()=>{
        if (state.success !== undefined) {
            if (state.success) {
                setNotification({
                    status: "success",
                    text: "Successfully updated profile"
                });
            } else {
                setNotification({
                    status: "error",
                    text: "Failed to update profile"
                });
            }
        }
        if (!state.success) return;
        mutateUser();
    }, [state.success, mutateUser, setNotification, state]);

    return (
        <div className={s.prof_content}>
            <Title />
            <div className="relative max-h-[70vh] overflow-y-scroll px-6 pt-2 pb-5">
                <form
                    action={action}
                    className="flex flex-col gap-4 py-5"
                >
                    <Forms errors={state.errors}/>
                    <SaveBtn pending={pending} />
                </form>
            </div>
        </div>
    )
}