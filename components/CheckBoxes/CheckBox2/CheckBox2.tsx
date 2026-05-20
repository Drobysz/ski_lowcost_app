"use client";

import { useState } from "react";
import styles from "./cb2.module.scss";
import cn from "classnames";

export const CheckBox2 = ()=> {
	const [checked, setCheck] = useState(false);

	return (
		<span
			className={cn(styles.box, checked ? styles.checked : styles.unchecked)}
			onClick={() => setCheck((v) => !v)}
			role="checkbox"
			aria-checked={checked}
			tabIndex={0}
		>
			{!checked && <span className={styles.dot} />}
		</span>
	)
}