'use client';

import { useState } from "react";
import { InputProps } from "./Input.props";
import s from "./input.module.scss";
import cn from "classnames";
import { Eye, EyeOff } from "lucide-react";

export const Input = ({
    placeholder,
    name,
    type,
    label,
    error,
    options,
    colSpan,
    className,
    ...props
}: InputProps) => {
    const [conceal, setConceal] = useState(true);
    const isPasswordConcealed = type === "password" && conceal;
    const inputType = type === "password"
        ? (isPasswordConcealed ? "password" : "text")
        : type;
    const listId = `${name}-opts`;

    return (
        <label className={cn(
            s.form_content_container,
            colSpan === 2 && "col-span-2",
            colSpan === 1 && "col-span-1"
        )}>
            <div className="flex gap-3 items-center-safe">
                {label && <span className={s.label}>{label}</span>}
                {error &&
                    <span className="text-sm text-red-600">
                        {error}
                    </span>
                }
            </div>
            
            <div className="relative">
                <input
                    {...props}
                    type={inputType}
                    placeholder={placeholder}
                    name={name}
                    list={options ? listId : undefined}
                    
                    className={cn(
                        s.input_container,
                        className,
                        "focus:ring-2 focus:ring-blue-500",
                        "focus:outline-0 focus:ring-offset-2 focus:ring-offset-white"
                    )}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setConceal((prev) => !prev)}
                        className={s.eye}
                    >
                        {conceal ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                )}

            </div>

            {options && (
                <datalist id={listId}>
                    {options.map(v=> <option key={`opt-${v}`}>{v}</option>)}
                </datalist>
            )}
        </label>
    );
};
