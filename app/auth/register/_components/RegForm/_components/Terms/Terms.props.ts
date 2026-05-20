import { Dispatch, SetStateAction } from "react";

export interface TermsProps {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
}   