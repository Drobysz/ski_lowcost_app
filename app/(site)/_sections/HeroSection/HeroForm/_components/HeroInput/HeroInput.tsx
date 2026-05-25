'use client';

import { Btn } from "@/components";
import s from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/global.context";

export const HeroInput = ()=> {
    const r = useRouter();
    const { isLoggedIn } = useContext(GlobalContext);

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
                        onClick={()=> r.push(isLoggedIn ? '/booking' : '/auth/login')}
                    >
                        Search Rooms
                    </Btn>
                </li>
            </ul>
        </div>
    )
}