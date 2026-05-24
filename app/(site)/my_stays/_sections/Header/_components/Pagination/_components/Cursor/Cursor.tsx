import { CursorProps } from "./Cursor.props";
import { motion } from "framer-motion";
import styles from "./cursor.module.scss";

export const Cursor = ({ position }: CursorProps)=> {
	return (
		<motion.li
            animate={{
                ...position,
            }}
            className={styles.cursor}
        />
	)
}