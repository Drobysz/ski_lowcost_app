import { BedDouble, LockKeyhole } from "lucide-react";
import { EMPTY_BED_PRICE, formatCurrency } from "../../_utils/pricing";
import styles from "./style.module.scss";
import type { CheckoutSummaryProps } from "./CheckoutSummary.props";

export const CheckoutSummary = ({
    rooms,
    summary,
    pending,
    disabled,
    onConfirm
}: CheckoutSummaryProps) => {
    return (
        <aside className={styles.summary} aria-label="Checkout summary">
            <div>
                <span className={styles.eyebrow}>Grand Total</span>
                <strong className={styles.total}>{formatCurrency(summary.grandTotal)}</strong>
            </div>

            <div className={styles.block}>
                <h2>Selected rooms</h2>
                <div className={styles.rooms}>
                    {rooms.map((room) => (
                        <span key={room.id}>
                            <BedDouble size={15} aria-hidden="true" />
                            Room №{room.num}, {room.nb_lits} beds
                        </span>
                    ))}
                </div>
            </div>

            <dl className={styles.lines}>
                <div>
                    <dt>Member prices</dt>
                    <dd>{formatCurrency(summary.memberTotal)}</dd>
                </div>
                <div>
                    <dt>Empty bed fee</dt>
                    <dd>
                        {summary.emptyBeds} x {formatCurrency(EMPTY_BED_PRICE)} = {formatCurrency(summary.emptyBedFee)}
                    </dd>
                </div>
                <div>
                    <dt>Occupied beds</dt>
                    <dd>{summary.occupiedBeds}/{summary.bedsTotal}</dd>
                </div>
            </dl>

            <button
                type="button"
                disabled={disabled || pending}
                onClick={onConfirm}
            >
                <LockKeyhole size={16} aria-hidden="true" />
                {pending ? "Creating reservation..." : "Confirm Booking"}
            </button>
            <p>Payment is completed by the current client.</p>
        </aside>
    );
};
