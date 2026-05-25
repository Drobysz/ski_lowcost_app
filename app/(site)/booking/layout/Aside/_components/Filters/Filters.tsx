import { jakarta_bold, jakarta_medium } from "@/fonts/fonts";
import { FilterInput } from "./FilterInput/FilterInput";
import s from "./style.module.scss";
import cn from "classnames";
import { Filter } from "@/interface/Filter";

type FilterOption = {
    label: string,
    name: keyof Filter,
    values: Array<string | number>
}

export const Filters = ()=> {
    const filters: FilterOption[] = [
        {
            label: "Beds size",
            name: "room_size",
            values: [2, 4, 6]
        },
        {
            label: "Views",
            name: "view",
            values: ["Slopes", "Parking"]
        },
    ];

    return (
        <fieldset className={s.filter_body}>
            <h3 className={jakarta_bold.className}>
                Filters
            </h3>
            <div className="flex flex-col gap-4">
                {filters.map((f, i)=>(
                    <fieldset
                        key={`field-${i}`}
                        className={s.category}
                    >
                        <legend className={cn(
                            jakarta_medium.className,
                            "pb-2"
                        )}>
                            {f.label}
                        </legend>
                        <div className="flex justify-between">
                            {f.values.map((v, i)=> (
                                <FilterInput
                                    key={`filter_input_${i}`}
                                    name={f.name}
                                    value={v}
                                />
                            ))}
                        </div>
                    </fieldset>
                ))}
            </div>
        </fieldset>
    )
}
