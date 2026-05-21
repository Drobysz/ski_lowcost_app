'use client'

import { AuthContext } from "@/app/auth/context/auth.context";
import { ChangeEvent, useContext } from "react";
import formsData from "./inputs";
import { Input } from "@/components";
import { FormError } from "@/auth/FormSchemes";

export const Forms = ({
    errors
}: {
    errors?: FormError
})=> {
    const { setLogFormData } = useContext(AuthContext);

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLogFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(formsData).map(([k, v], i)=> (
                <Input
                    key={`input${i}-${k}`}
                    type={v.type}
                    placeholder={v.placeholder}
                    label={v.label}
                    colSpan={v.colSpan}
                    name={k}
                    onChange={handleForm}
                    error={
                        errors && errors[k as keyof FormError]
                        &&
                        errors[k as keyof FormError]
                    }
                    autoComplete={k === "tel" ? "tel" : "current-password"}
                />
            ))}
        </div>
    )
}
