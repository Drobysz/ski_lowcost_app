"use client";

import { CheckCircle2, UserRound, X } from "lucide-react";
import styles from "./style.module.scss";
import type { GroupMemberCardProps } from "./GroupMemberCard.props";

export const GroupMemberCard = ({
    user,
    label,
    isLeader = false,
    onRemove
}: GroupMemberCardProps) => {
    const fullName = `${user.first_name} ${user.last_name}`;

    return (
        <div className={styles.member}>
            <div className={styles.iconWrap} aria-hidden="true">
                <UserRound size={18} />
            </div>
            <div className={styles.copy}>
                <strong>{fullName}</strong>
                <span>{label}</span>
            </div>
            {onRemove ? (
                <button
                    type="button"
                    className={styles.remove}
                    aria-label={`Remove ${fullName} from group`}
                    onClick={() => onRemove(user.id)}
                    disabled={isLeader}
                >
                    {isLeader ? <CheckCircle2 size={20} /> : <X size={18} />}
                </button>
            ) : (
                <CheckCircle2 className={styles.check} size={20} aria-hidden="true" />
            )}
        </div>
    );
};
