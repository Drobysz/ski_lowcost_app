import { z } from "zod";

export const RegisterFormScheme = z.object({
    first_name: z.string().min(1, { message: "First name's required" }).max(50).trim(),
    last_name: z.string().min(1, { message: "Last name's required" }).max(50).trim(),
    age: z.coerce.number().int().min(0, { message: "Age is required" }),
    address: z.string().min(1, { message: "Address is required" }).max(255).trim(),
    birth_date: z.string().min(1, { message: "Birth date is required" }),
    tel: z.string().min(1, { message: "Tel number is required" }).max(50).trim(),
    skiing_level: z.enum(["beginner", "medium", "confirmed"], { message: "level is required" }),
    height: z.coerce.number().min(0, { message: "Height is required" }),
    weight: z.coerce.number().int().min(0, { message: "Weight is required" }),
    shoe_size: z.coerce.number().int().min(0, { message: "Shoe size is required" }),
    password: z
        .string()
        .min(6, { message: "Be at least 6 characters" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
        .regex(/[0-9]/, { message: "At least one number required" })
        .regex(/[^a-zA-Z0-9]/, {
            message: "At least one special character required",
        })
        .trim(),
});

export const LoginFormScheme = z.object({
    tel: z
        .string("email_invalid")
        .min(1, { message: "tel number required" })
        .trim(),
    password: z
        .string()
        .min(1, { message: "password required" })
        .trim(),
});

export type FormError = {
    first_name?: string;
    last_name?: string;
    age?: string;
    address?: string;
    birth_date?: string;
    tel?: string;
    skiing_level?: string;
    height?: string;
    weight?: string;
    shoe_size?: string;
    password?: string;
};

export type FormState =
    {
        errors?: FormError,
        message?: string,
        success?: boolean
    };