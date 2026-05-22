"use client";

import { motion } from "framer-motion";
import s from "./style.module.scss";
import cn from "classnames";

export const CardPagination = ({
    imgIdx,
    setImgIdx,
    hover,
    qntty
}: {
    imgIdx: number;
    setImgIdx: (idx: number) => void;
    hover: boolean;
    qntty: number;
})=> {
    return (
        <motion.ul
            className={s.bounds}
            animate={{
                opacity: hover ? 1 : 0,
                y: hover ? 0 : -5,
                transition: { duration: 0.2, ease: "easeInOut" }
            }}
        >
            {Array(qntty).fill(true).map((_, i)=> (
                <li
                    className={cn(
                        imgIdx === i && s.active,
                        s.point
                    )}
                    onClick={()=> setImgIdx(i)}
                    key={`card-pag-${i}`}
                />
            ))}
        </motion.ul>
    )
}