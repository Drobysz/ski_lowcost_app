import { UsersRound } from "lucide-react";
import { CheckoutMemberRow } from "../../_components/CheckoutMemberRow/CheckoutMemberRow";
import styles from "./style.module.scss";
import type { MembersPriceTableProps } from "./MembersPriceTable.props";

export const MembersPriceTable = ({ memberPrices }: MembersPriceTableProps) => {
    return (
        <section className={styles.table}>
            <header className={styles.header}>
                <h1>Checkout</h1>
                <span><UsersRound size={16} /> {memberPrices.length} Guests</span>
            </header>
            <div className={styles.labels} aria-hidden="true">
                <span>Member</span>
                <span>Multiplier</span>
                <span>Individual Price</span>
            </div>
            <div className={styles.rows}>
                {memberPrices.map((item) => (
                    <CheckoutMemberRow key={item.user.id} item={item} />
                ))}
            </div>
        </section>
    );
};
