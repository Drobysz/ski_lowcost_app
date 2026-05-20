import { SkiingLvl } from "@/interface";

export interface RegFormType {
    first_name: string;
    last_name: string;
    age: number;
    address: string;
    birth_date: string; // format: YYYY-MM-DD
    tel: string;
    skiing_level: SkiingLvl;
    height: number;
    weight: number;
    shoe_size: number;
    password: string;
}

export interface LogFormType {
    tel: string;
    password: string;
}