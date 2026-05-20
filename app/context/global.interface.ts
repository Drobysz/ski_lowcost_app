import { Dispatch, SetStateAction } from "react";
import { AuthStatus } from "@/interface";

export interface GlobalContextInterface {
    isLoggedIn: AuthStatus;

    setIsLoggedIn: Dispatch<SetStateAction<AuthStatus>>;
}