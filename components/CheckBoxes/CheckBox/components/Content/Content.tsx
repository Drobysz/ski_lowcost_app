import CheckIcon from "@/assets/checked.svg";
import styles from "../../cb.module.scss";

export const Content = ({
	checked, type
}: {
	checked: boolean,
	type: "over-category" | "sub-category"
})=> {
	return (
		<>
			{checked && type == "over-category" &&
				<hr className={styles.line}/>
			}
			{checked && type == "sub-category" &&
				<CheckIcon className="text-white"/>
			}
		</>
	)
}