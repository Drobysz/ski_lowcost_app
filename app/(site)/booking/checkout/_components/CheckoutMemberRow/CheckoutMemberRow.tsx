import { Baby, SmilePlus, UserRound } from "lucide-react";
import { formatCurrency } from "@/helper";
import styles from "./style.module.scss";
import type { CheckoutMemberRowProps } from "./CheckoutMemberRow.props";

export const CheckoutMemberRow = ({ item }: CheckoutMemberRowProps) => {
    const Icon = item.user.age < 2 ? Baby : item.user.age < 9 ? SmilePlus : UserRound;

    return (
        <div className={styles.row}>
            <div className={styles.member}>
                <span className={styles.icon} aria-hidden="true">
                    <Icon size={17} />
                </span>
                <span>
                    <strong>{item.user.first_name} {item.user.last_name}</strong>
                    <small>{item.label}</small>
                </span>
            </div>
            <span className={styles.multiplier}>{item.multiplier.toFixed(1)}x</span>
            <strong className={styles.price}>{formatCurrency(item.price)}</strong>
        </div>
    );
};
