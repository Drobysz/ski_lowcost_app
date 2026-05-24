"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"
import s from "./style.module.scss";
import { motion } from "framer-motion";
import cn from "classnames";

export const Switchers = ({
    imgIdx,
    setImgIdx,
    lastIdx,
    hover
}: {
    imgIdx: number;
    setImgIdx: (idx: number) => void;
    lastIdx: number;
    hover: boolean;
}) => {
    return (
        <>
            <motion.button 
                className={cn(
                    s.switcher_left,
                    imgIdx === 0 && "pointer-events-none"
                )}
                onClick={() => setImgIdx(Math.max(0, imgIdx - 1))}
                animate={{
                    opacity: hover ? 1 : 0,
                    x: hover ? 0 : -20,
                    transition: { duration: 0.2, ease: "easeInOut" }
                }}
            >
                <ChevronLeft
                    size={20} 
                    color={imgIdx === 0 ? "gray" : "black"}
                />
            </motion.button>
            <motion.button 
                className={cn(
                    s.switcher_right,
                    imgIdx === lastIdx && "pointer-events-none"
                )}
                onClick={() => setImgIdx(Math.min(lastIdx, imgIdx + 1))}
                animate={{
                    opacity: hover ? 1 : 0,
                    x: hover ? 0 : 20,
                    transition: { duration: 0.2, ease: "easeInOut" }
                }}
            >
                <ChevronRight
                    size={20} 
                    color={imgIdx === lastIdx ? "gray" : "black"}
                />
            </motion.button>
        </>
    )
}