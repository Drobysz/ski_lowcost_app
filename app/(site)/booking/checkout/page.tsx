"use client";

import { useContext, useMemo } from "react";
import { BookingContext } from "../context/booking.context";
import { GlobalContext } from "@/app/context/global.context";
import { createReservation, createStripeCheckout } from "@/queries";
import { CheckoutSummary } from "./_sections/CheckoutSummary/CheckoutSummary";
import { MembersPriceTable } from "./_sections/MembersPriceTable/MembersPriceTable";
import {
    getBookingPriceSummary,
    getWeeks,
    memberRequiresBed
} from "@/helper";
import styles from "./page.module.scss";
import type { Room } from "@/interface/Reservation";
import type { UserSession } from "@/interface";

const buildAccommodations = (rooms: Room[], members: UserSession[]) => {
    const fallbackRoomId = rooms[0]?.id;

    if (!fallbackRoomId) {
        return [];
    }

    const roomSlots = rooms.flatMap((room) =>
        Array.from({ length: room.nb_lits }, () => room.id)
    );
    let slotIndex = 0;

    return members.map((member) => {
        const roomId = memberRequiresBed(member.age)
            ? roomSlots[slotIndex++] ?? fallbackRoomId
            : fallbackRoomId;

        return {
            room_id: roomId,
            client_id: member.id,
        };
    });
};

export default function BookingCheckoutPage() {
    const {
        choosedRooms = [],
        users = [],
        available,
        checkoutPending,
        setCheckoutPending,
    } = useContext(BookingContext);
    const {
        user: currentUser,
        setNotification
    } = useContext(GlobalContext);
    const weeksNum = getWeeks(available.check_in, available.check_out);
    const summary = useMemo(
        () => getBookingPriceSummary(choosedRooms, users, weeksNum),
        [choosedRooms, users, weeksNum],
    );
    const canConfirm =
        Boolean(currentUser) &&
        choosedRooms.length > 0 &&
        users.length > 0 &&
        summary.occupiedBeds <= summary.bedsTotal;

    const confirmReservation = async () => {
        if (!currentUser || !canConfirm) {
            return;
        }

        setCheckoutPending(true);

        try {
            const reservation = await createReservation({
                client_id: currentUser.id,
                check_in: available.check_in,
                check_out: available.check_out,
                total_price: summary.grandTotal,
                accommodations: buildAccommodations(choosedRooms, users),
            });

            const stripeSession = await createStripeCheckout({
                reservation_id: reservation.id,
                final_price: summary.grandTotal,
                currency: "eur",
                title: `Zarza-Ski booking for ${users.length} guest${users.length > 1 ? "s" : ""}`,
            });

            window.location.assign(stripeSession.checkout_url);
        } catch {
            setNotification({
                text: "Failed to create reservation",
                status: "error",
            });
            setCheckoutPending(false);
        }
    };

    if (choosedRooms.length === 0 || users.length === 0) {
        return (
            <section className={styles.empty}>
                <h1>Checkout</h1>
                <p>Select at least one room and one group member before checkout.</p>
            </section>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.mainColumn}>
                <MembersPriceTable memberPrices={summary.memberPrices} />
                <div className={styles.notice}>
                    Empty beds are charged at 150 EUR each. Children younger than 2 are free and do not use a paid bed.
                </div>
            </div>
            <CheckoutSummary
                rooms={choosedRooms}
                summary={summary}
                pending={checkoutPending}
                disabled={!canConfirm}
                weeksNum={weeksNum}
                onConfirm={confirmReservation}
            />
        </div>
    );
}
