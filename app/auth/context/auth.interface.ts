import { Dispatch, SetStateAction } from "react";

export interface RegFormProps {
    first_name: string;
    last_name: string;
    age: string;
    address: string;
    birth_date: string;
    tel: string;
    skiing_level: string;
    height: string;
    weight: string;
    shoe_size: string;
    password: string;
};

export interface LogFormProps {
    tel: string;
    password: string;
}

export interface AuthContextInterface {
    logFormData: LogFormProps,
    regFormData: RegFormProps,

    setLogFormData: Dispatch<SetStateAction<LogFormProps>>,
    setRegFormData: Dispatch<SetStateAction<RegFormProps>>,
}