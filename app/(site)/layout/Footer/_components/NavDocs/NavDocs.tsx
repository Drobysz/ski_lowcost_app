"use client";

import docs from "./docs";
import { UnderlinedLink } from "@/components";

export const NavDocs = ()=> {
    return (
        <nav>
            <ul className="flex gap-8 max-[400px]:text-sm">
                {docs.map(({href, label}, i)=> (
                    <UnderlinedLink
                        key={`footer-link-${i}`}
                        href={href}
                        colorLine="dark"
                        className="text-gray-700"
                    >
                        {label}
                    </UnderlinedLink>
                ))}
            </ul>
        </nav>
    )
}