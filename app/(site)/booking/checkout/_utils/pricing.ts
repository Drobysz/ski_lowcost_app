import type { UserSession } from "@/interface";
import type { Room } from "@/interface/Reservation";

export const OCCUPIED_BED_PRICE = 420;
export const EMPTY_BED_PRICE = 150;

export type MemberPrice = {
    user: UserSession;
    multiplier: number;
    price: number;
    requiresBed: boolean;
    label: string;
};

export type BookingPriceSummary = {
    memberPrices: MemberPrice[];
    memberTotal: number;
    bedsTotal: number;
    occupiedBeds: number;
    emptyBeds: number;
    emptyBedFee: number;
    grandTotal: number;
};

export const getMemberMultiplier = (age: number) => {
    if (age < 2) {
        return 0;
    }

    if (age < 9) {
        return 0.8;
    }

    return 1;
};

export const memberRequiresBed = (age: number) => age >= 2;

export const getMemberLabel = (user: UserSession, isLeader = false) => {
    if (isLeader) {
        return "Adult (Leader)";
    }

    if (user.age < 2) {
        return "Baby";
    }

    if (user.age < 9) {
        return `Child (${user.age} yrs)`;
    }

    return "Adult";
};

export const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);

export const getRoomBedsTotal = (rooms: Room[]) =>
    rooms.reduce((total, room) => total + room.nb_lits, 0);

export const getBookingPriceSummary = (
    rooms: Room[],
    members: UserSession[],
): BookingPriceSummary => {
    const bedsTotal = getRoomBedsTotal(rooms);
    const memberPrices = members.map((user, index) => {
        const multiplier = getMemberMultiplier(user.age);
        const price = OCCUPIED_BED_PRICE * multiplier;

        return {
            user,
            multiplier,
            price,
            requiresBed: memberRequiresBed(user.age),
            label: getMemberLabel(user, index === 0),
        };
    });
    const occupiedBeds = memberPrices.filter((item) => item.requiresBed).length;
    const emptyBeds = Math.max(0, bedsTotal - occupiedBeds);
    const memberTotal = memberPrices.reduce((total, item) => total + item.price, 0);
    const emptyBedFee = emptyBeds * EMPTY_BED_PRICE;

    return {
        memberPrices,
        memberTotal,
        bedsTotal,
        occupiedBeds,
        emptyBeds,
        emptyBedFee,
        grandTotal: memberTotal + emptyBedFee,
    };
};
