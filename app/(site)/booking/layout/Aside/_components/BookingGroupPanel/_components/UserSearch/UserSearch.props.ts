import type { UserSession } from "@/interface";

export interface UserSearchProps {
    selectedUsers: UserSession[];
    onAddUser: (user: UserSession) => void;
}
