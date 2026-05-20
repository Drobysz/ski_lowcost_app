"use client";

import { CheckBoxProps } from "./body.module";
import cn from "classnames";
import styles from "../../cb.module.scss";

export const CheckBoxBody = ({
	children,
	checked,
	setChecked
}: CheckBoxProps)=> {
	const checkStyle = "border-blue-500 bg-blue-500";

	return (
		<span
			className={cn(
				styles.checkbox_view,
				"border-2",
				checked ? checkStyle : "border-gray-400"
			)}
			onClick={()=> setChecked((v)=> !v)}
			aria-checked={checked}
			role="checkbox"
		>
			{children}
		</span>
	)
}