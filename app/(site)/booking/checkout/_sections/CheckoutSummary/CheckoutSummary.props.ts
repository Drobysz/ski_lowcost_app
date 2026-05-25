import type { Room } from "@/interface/Reservation";
import type { BookingPriceSummary } from "../../_utils/pricing";

export interface CheckoutSummaryProps {
    rooms: Room[];
    summary: BookingPriceSummary;
    pending: boolean;
    disabled: boolean;
    onConfirm: () => void;
}
