import { UserSession } from "@/interface";

export interface ProfileProps {
    user?: UserSession | undefined;
    isLoading?: boolean;
    error?: boolean
}