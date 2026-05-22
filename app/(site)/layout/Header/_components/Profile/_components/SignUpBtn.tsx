'use client';

import { Btn } from "@/components"
import { useRouter } from "next/navigation";

export const SignUpBtn = ()=> {
    const router = useRouter();

    return (
        <Btn
            colorSet="blue"
            form="round"
            onClick={()=> router.push('/auth/login')}
        >
            Sign In
        </Btn>
    )
}