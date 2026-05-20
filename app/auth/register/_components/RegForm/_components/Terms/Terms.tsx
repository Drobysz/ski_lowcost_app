'use client'

import { CheckBox, UnderlinedInnerLink } from "@/components"
import { TermsProps } from "./Terms.props"
import cn from "classnames";
import { jakarta_semibold } from "@/fonts/fonts";

export const Terms = ({ checked, setChecked }: TermsProps) => {
    return (
        <div className={cn(
            "flex items-center gap-2 text-sm",
            jakarta_semibold.className
        )}>
            <CheckBox
                type="sub-category"
                checked={checked}
                setChecked={setChecked}
            />
            <div className="flex gap-1">
                I agree to the
                <UnderlinedInnerLink
                    href="#"
                    colorLine="primary"
                    className="text-blue-700"
                >
                    Terms and Conditions
                </UnderlinedInnerLink>
            </div>
        </div>
    )
}