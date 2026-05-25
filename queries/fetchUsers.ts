import type { UserSession } from "@/interface";
import { fetchUniversal } from "./fetchUniversal";

export const fetchUsers = async (search?: string): Promise<UserSession[]> => {
    return await fetchUniversal("users", search ? { search } : undefined);
};
