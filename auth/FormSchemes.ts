import { z } from "zod";

const numberFromInput = (schema: z.ZodType<number>) =>
    z.preprocess(
        (value) => value === "" ? undefined : value,
        schema,
    );

const emptyToUndefined = (schema: z.ZodTypeAny) =>
    z.preprocess(
        (value) => value === "" ? undefined : value,
        schema.optional()
    );

export const RegisterFormScheme = z.object({
    first_name: z
        .string()
        .min(1, { message: "First name's required" })
        .max(50)
        .trim(),
    last_name: z
        .string()
        .min(1, { message: "Last name's required" })
        .max(50)
        .trim(),
    age: numberFromInput(
        z.coerce.number({ message: "Age is required" })
        .int()
        .min(0, { message: "Age must be zero or greater" })
    ),
    address: z
        .string()
        .min(1, { message: "Address is required" })
        .max(255)
        .trim(),
    birth_date: z
        .string()
        .min(1, { message: "Birth date is required" })
        .refine(
            (value) => !Number.isNaN(Date.parse(value)),
            { message: "Birth date must be a valid date" },
        ),
    tel: z
        .string()
        .min(1, { message: "Tel number is required" })
        .max(50)
        .trim(),
    skiing_level: z.enum(["beginner", "medium", "confirmed"], { message: "level is required" }),
    height: numberFromInput(
        z.coerce.number({ message: "Height is required" })
        .int()
        .min(0, { message: "Height must be zero or greater" })
        .max(3, { message: "Height must not be greater then 3m" })
    ),
    weight: numberFromInput(
        z.coerce.number({ message: "Weight is required" })
        .int().min(0, { message: "Weight must be zero or greater" })
        .max(150, { message: "Weight must not be greater then 150kg" })),
    shoe_size: numberFromInput(
        z.coerce.number({ message: "Shoe size is required" })
        .int()
        .min(0, { message: "Shoe size must be zero or greater" })
        .max(50, { message: "Shoe size must not be greater then 50" })),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim(),
});

export const UpdateFormScheme = z.object({
    first_name: emptyToUndefined(
        z
            .string()
            .max(50)
            .trim()
    ),
    last_name: emptyToUndefined(
        z
            .string()
            .max(50)
            .trim()
    ),
    age: emptyToUndefined(
        numberFromInput(
            z.coerce.number()
                .int()
                .min(0, { message: "Age must be zero or greater" })
        )
    ),
    address: emptyToUndefined(
        z
            .string()
            .max(255)
            .trim()
    ),
    birth_date: emptyToUndefined(
        z
            .string()
            .refine(
                (value) => !Number.isNaN(Date.parse(value)),
                { message: "Birth date must be a valid date" },
            )
    ),
    tel: emptyToUndefined(
        z
            .string()
            .max(50)
            .trim()
    ),
    skiing_level: emptyToUndefined(
        z.enum(["beginner", "medium", "confirmed"])
    ),
    height: emptyToUndefined(
        numberFromInput(
            z.coerce.number()
                .int()
                .min(0, { message: "Height must be zero or greater" })
                .max(3, { message: "Height must not be greater then 3m" })
        )
    ),
    weight: emptyToUndefined(
        numberFromInput(
            z.coerce.number()
                .int()
                .min(0, { message: "Weight must be zero or greater" })
                .max(150, { message: "Weight must not be greater then 150kg" })
        )
    ),
    shoe_size: emptyToUndefined(
        numberFromInput(
            z.coerce.number()
                .int()
                .min(0, { message: "Shoe size must be zero or greater" })
                .max(50, { message: "Shoe size must not be greater then 50" })
        )
    ),
    password: emptyToUndefined(
        z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .trim()
    ),
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
