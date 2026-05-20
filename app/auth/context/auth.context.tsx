"use client";

import { createContext, ReactNode, useState } from "react";
import { AuthContextInterface, LogFormProps, RegFormProps } from "./auth.interface";

const emptyLogForm = {
    tel: "",
    password: ""
};

const emptyRegForm = {
    first_name: "",
    last_name: "",
    age: "",
    address: "",
    birth_date: "",
    tel: "",
    skiing_level: "",
    height: "",
    weight: "",
    shoe_size: "",
    password: "",
};

export const AuthContext = createContext<AuthContextInterface>({
    regFormData: emptyRegForm,
    logFormData: emptyLogForm,

    setRegFormData: ()=> {},
    setLogFormData: ()=> {},
});

export const AuthContextProvider = ({
    children
}: {
    children: ReactNode
})=> {
    const [regFormData, setRegFormData] = useState<RegFormProps>(emptyRegForm);
    const [logFormData, setLogFormData] = useState<LogFormProps>(emptyLogForm);

    return (
        <AuthContext.Provider
            value={{
                regFormData: regFormData,
                logFormData: logFormData,

                setLogFormData,
                setRegFormData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}