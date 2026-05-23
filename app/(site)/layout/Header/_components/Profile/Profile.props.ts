import type { UserSession } from "@/interface";
import type { ApiRequestError } from "@/queries";

export interface ProfileProps {
    user?: UserSession | undefined;
    isLoading?: boolean;
    error?: ApiRequestError | Error
}
