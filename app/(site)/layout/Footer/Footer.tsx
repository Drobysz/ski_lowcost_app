'use client';

import s from "./style.module.scss";
import {
    Title,
    NavDocs
} from "./_components"

export const Footer = ()=> {
    return (
        <footer className={s.footer}>
            <Title />
            <NavDocs />
        </footer>
    )
}