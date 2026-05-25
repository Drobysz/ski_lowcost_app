import type { UserSession } from "@/interface";

export interface GroupMemberCardProps {
    user: UserSession;
    label: string;
    isLeader?: boolean;
    onRemove?: (userId: number) => void;
}
