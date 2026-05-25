import type { Room } from "@/interface/Reservation";
import type { BookingPriceSummary } from "@/helper";

export interface CheckoutSummaryProps {
    rooms: Room[];
    summary: BookingPriceSummary;
    pending: boolean;
    disabled: boolean;
    weeksNum: number;
    onConfirm: () => void;
}
