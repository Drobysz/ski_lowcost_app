import { Header } from "./layout/index";
import cn from "classnames";
import { AuthContextProvider } from "./context/auth.context";

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <AuthContextProvider>
            <div>
                <Header />
                <main className={cn(
                    "flex items-center py-10",
                    "justify-center shrink-0 bg-gray-200"
                )}>
                    {children}
                </main>
            </div>
        </AuthContextProvider>
    )
}