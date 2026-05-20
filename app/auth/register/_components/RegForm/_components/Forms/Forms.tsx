'use client'

import { AuthContext } from "@/app/auth/context/auth.context";
import { RegFormType } from "@/app/auth/interfaces";
import { ChangeEvent, useContext, useEffect } from "react";
import formsData from "./inputs";
import { Input } from "@/components";
import { FormError } from "@/auth/FormSchemes";
import cn from "classnames";

export const Forms = ({
    errors
}: {
    errors?: FormError
})=> {
    const { setRegFormData } = useContext(AuthContext);
    

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("name: ", name);
        console.log("value: ", value);

        setRegFormData((prev) => ({
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
                    options={"options" in v ? v.options : undefined}
                    error={
                        errors && errors[k as keyof FormError]
                        &&
                        errors[k as keyof FormError]
                    }
                />
            ))}
        </div>
    )
}