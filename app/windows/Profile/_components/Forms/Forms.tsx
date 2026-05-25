"use client";

import { FormError } from "@/auth/FormSchemes"
import { Input } from "@/components"
import formsData from "./inputs"
import { useContext } from "react";
import { GlobalContext } from "@/app/context/global.context";
import { UserSession } from "@/interface";
import s from "./style.module.scss";

export const Forms = ({
    errors
}: {
    errors?: FormError
})=> {
    const { user } = useContext(GlobalContext);

    return (
        <div className={s.grid}>
            {Object.entries(formsData).map(([k, v], i)=> (
                <Input
                    key={`input${i}-${k}`}
                    type={v.type}
                    placeholder={
                        user 
                            ? k !== "password"
                                ? String(user[k as keyof UserSession])
                                : "******"
                            : v.placeholder
                    }
                    // value={k === "birth_date" && user ? user.birth_date ?? "" : ""}
                    label={v.label}
                    colSpan={v.colSpan}
                    name={k}
                    options={"options" in v ? v.options : undefined}
                    error={
                        errors && errors[k as keyof FormError]
                        &&
                        errors[k as keyof FormError]
                    }
                    autoComplete={
                        k === "password"
                            ? "new-password"
                            : undefined
                    }
                />
            ))}
        </div>
    )
}
