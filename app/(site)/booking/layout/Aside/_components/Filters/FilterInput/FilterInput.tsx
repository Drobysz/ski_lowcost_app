"use client";

import { ChangeEvent, useContext } from "react";
import s from "./style.module.scss";
import { BookingContext } from "@/app/(site)/booking/context/booking.context";
import { Filter, View } from "@/interface/Filter";

export const FilterInput = ({
    name,
    value
}: {
    name: keyof Filter,
    value: string | number
})=> {
    const {
        available,
        setAvailable
    } = useContext(BookingContext);

    const checked = name === "room_size"
        ? (available.filters?.room_size ?? []).includes(Number(value))
        : (available.filters?.view ?? []).includes(value as View);

    const onChange = (event: ChangeEvent<HTMLInputElement>)=> {
        const isChecked = event.target.checked;

        setAvailable((previous)=> {
            const currentValues = name === "room_size"
                ? previous.filters?.room_size ?? []
                : previous.filters?.view ?? [];
            const filterValue = name === "room_size" ? Number(value) : value as View;
            const nextValues = isChecked
                ? [...currentValues, filterValue]
                : currentValues.filter((selectedValue)=> selectedValue !== filterValue);
            const nextFilters = {
                ...previous.filters,
                [name]: nextValues
            } as Filter;

            if (nextValues.length === 0) {
                delete nextFilters[name];
            }

            return {
                ...previous,
                filters: Object.keys(nextFilters).length > 0 ? nextFilters : undefined
            };
        });
    }

    return (
        <label className={s.option}>
            <input 
                type="checkbox" 
                name={name} 
                value={`${value}`} 
                checked={checked}
                onChange={onChange}
            />
            <span>
                {value}
            </span>
        </label>
    )
}
