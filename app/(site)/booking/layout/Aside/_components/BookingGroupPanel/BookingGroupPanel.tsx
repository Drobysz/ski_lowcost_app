"use client";

import { LockKeyhole, UsersRound } from "lucide-react";
import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/app/context/global.context";
import { BookingContext } from "@/app/(site)/booking/context/booking.context";
import { UserSearch, GroupMemberCard } from "./_components";
import {
    formatCurrency,
    getBookingPriceSummary,
    getMemberLabel,
    getWeeks
} from "@/helper";
import styles from "./style.module.scss";
import type { UserSession } from "@/interface";

export const BookingGroupPanel = () => {
    const router = useRouter();
    const { user: currentUser } = useContext(GlobalContext);
    const {
        choosedRooms = [],
        users = [],
        available,
        setUsers
    } = useContext(BookingContext);
    const weeksNum = getWeeks(available.check_in, available.check_out);
    const summary = useMemo(
        () => getBookingPriceSummary(choosedRooms, users, weeksNum),
        [choosedRooms, users, weeksNum],
    );
    const hasRooms = choosedRooms.length > 0;
    const hasMembers = users.length > 0;
    const hasTooManyGuests = summary.occupiedBeds > summary.bedsTotal;
    const canCheckout = hasRooms && hasMembers && !hasTooManyGuests;

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        setUsers((previous) => {
            if (previous.some((member) => member.id === currentUser.id)) {
                return previous;
            }

            return [currentUser, ...previous];
        });
    }, [currentUser, setUsers]);

    const addUser = (newUser: UserSession) => {
        setUsers((previous) => {
            if (previous.some((member) => member.id === newUser.id)) {
                return previous;
            }

            return [...previous, newUser];
        });
    };

    const removeUser = (userId: number) => {
        if (currentUser?.id === userId) {
            return;
        }

        setUsers((previous) => previous.filter((member) => member.id !== userId));
    };

    return (
        <section className={styles.panel} aria-label="Booking group">
            <header className={styles.header}>
                <div className={styles.avatar} aria-hidden="true">
                    <UsersRound size={24} />
                </div>
                <div>
                    <h2>{`The ${currentUser?.last_name}'s Crew`}</h2>
                    <p>{summary.occupiedBeds}/{summary.bedsTotal} Beds Selected</p>
                </div>
            </header>

            <UserSearch selectedUsers={users} onAddUser={addUser} />

            <div className={styles.members}>
                {users.map((member, index) => (
                    <GroupMemberCard
                        key={member.id}
                        user={member}
                        label={getMemberLabel(member, index === 0)}
                        isLeader={currentUser?.id === member.id}
                        onRemove={removeUser}
                    />
                ))}
                {users.length === 0 && (
                    <p className={styles.emptyState}>Search and add at least one guest.</p>
                )}
                {summary.emptyBeds > 0 && hasRooms && (
                    <div className={styles.unassigned}>
                        <strong>Unassigned Guest</strong>
                        <span>{summary.emptyBeds} bed{summary.emptyBeds > 1 ? "s" : ""} empty</span>
                    </div>
                )}
                {hasTooManyGuests && (
                    <div className={styles.warning}>
                        <strong>Too many guests</strong>
                        <span>Select another room or remove a guest.</span>
                    </div>
                )}
            </div>

            <footer className={styles.footer}>
                <div className={styles.totalLine}>
                    <span>Total Selection</span>
                    <strong>{formatCurrency(summary.grandTotal)}</strong>
                </div>
                <button
                    type="button"
                    disabled={!canCheckout}
                    onClick={() => router.push("/booking/checkout")}
                >
                    <span>Checkout</span>
                    <LockKeyhole size={16} aria-hidden="true" />
                </button>
                {!canCheckout && (
                    <p>
                        {!hasRooms
                            ? "Select at least one room to proceed"
                            : !hasMembers
                                ? "Add a guest to proceed"
                                : "Selected rooms do not have enough beds"}
                    </p>
                )}
            </footer>
        </section>
    );
};
