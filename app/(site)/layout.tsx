import { ReactNode } from "react";
import s from "./GridLayout.module.scss";
import {
    Header,
    Footer
} from "./layout/index"

export default function SiteLayout({
	children
}: Readonly<{
  children: ReactNode;
}>) {
    return (
        <div className={s.wrapper}>
            <Header
                className={s.header}
            />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}