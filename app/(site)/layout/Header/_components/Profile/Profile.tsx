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
    // const errorStatus = error && "status" in error ? error.status : undefined;
    const shouldShowSignUp = (error || !user) && !isLoading;

    return (
        <div className={s.profile}>
            {isLoading && <Loading />}

            {shouldShowSignUp && <SignUpBtn />}
            
            {user && (
                <>
                    <p className={cn(
                        jakarta_bold.className,
                        s.user_name
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
