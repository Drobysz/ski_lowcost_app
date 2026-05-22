'use client';

import { Btn } from "@/components";
import s from "./style.module.scss";
import { useRouter } from "next/navigation";

export const HeroInput = ()=> {
    const r = useRouter();

    return (
        <div className={s.hero_bounderies}>
            <ul className={s.hero_input}>
                <li>
                    <span>
                        Firstly
                    </span>
                    <p>
                        ADD DATES
                    </p>
                </li>
                <li>
                    <span>
                        Secondly
                    </span>
                    <p>
                        ADD GUESTS
                    </p>
                </li>
                <li className="flex items-center justify-center">
                    <Btn
                        colorSet="blue"
                        form="round"
                        fullWidth
                        className="h-full"
                        onClick={()=> r.push('/booking')}
                    >
                        Search Rooms
                    </Btn>
                </li>
            </ul>
        </div>
    )
}