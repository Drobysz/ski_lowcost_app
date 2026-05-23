import { CursorProps } from "./Cursor.props";
import { motion } from "framer-motion";
import styles from "./cursor.module.scss";
import cn from "classnames";

export const Cursor = ({ position }: CursorProps)=> {
	return (
		<motion.li
            animate={{
                ...position,
            }}
            className={cn(
                styles.cursor,
                "bg-blue-100"
            )}
        />
	)
}