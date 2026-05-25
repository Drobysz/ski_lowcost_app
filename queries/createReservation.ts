export type CreateReservationPayload = {
    client_id: number;
    check_in: string;
    check_out: string;
    total_price: number;
    accommodations: Array<{
        room_id: number;
        client_id: number;
    }>;
};

export const createReservation = async (payload: CreateReservationPayload) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch("/api/post?item=reservations&method=POST", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            throw new Error(data?.message ?? "Failed to create reservation");
        }

        return data.data;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Reservation request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};
