import cn from "classnames";
import styles from "./mv.module.scss";
import { MVprops } from "./MW.props";

export const ModalWindow = ({
	className,
	children,
	tag = "span",
	...props
}: MVprops)=> {
	const Tag = tag;

	return (
		<Tag
			{...props}
			className={cn(
				className,
				styles.mod_window_span_view
			)}
		>
			{children}
		</Tag>
	)
}