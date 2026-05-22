'use client'

import { ProfileProps } from "./Profile.props"
import UserIcon from "@/assets/Icon.svg";
import s from "./style.module.scss";
import { jakarta_bold } from "@/fonts/fonts";
import cn from "classnames";
import {
    Loading,
    SignUpBtn
} from "./_components";

export const Profile = ({
    user,
    isLoading,
    error
}: ProfileProps)=> {
    return (
        <div className="flex items-center gap-2">
            {isLoading && <Loading />}

            {((error || !user) && !isLoading) && <SignUpBtn />}
            
            {user && (
                <>
                    <p className={cn(
                        jakarta_bold.className,
                        "text-sm"
                    )}>
                        {user.first_name} {user.last_name}
                    </p>
                    <button className={s.user_icon}>
                        <UserIcon />
                    </button>
                </>
            )}
        </div>
    )
}