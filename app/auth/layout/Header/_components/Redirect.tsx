import { UnderlinedInnerLink } from "@/components"

export const Redirect = ({
    page
}: {
    page: "login" | "register",
})=> {
    const linkPath = page === "login" ? "/auth/register" : "/auth/login";

    return (
        <div className="flex gap-1 text-sm">
            <p>
                {page === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"
                }
            </p>
            <UnderlinedInnerLink
                href={linkPath}
                colorLine="primary"
                className="text-blue-800"
            >
                {page === "login"
                    ? "Register"
                    : "Login "
                }
            </UnderlinedInnerLink>
        </div>
    )
}