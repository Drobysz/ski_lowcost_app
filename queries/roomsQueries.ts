export const fetchRooms = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch("/api/rooms", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) {
            throw new Error(data?.message ?? "Failed to fetch rooms");
        }

        return data.data;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Rooms request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};
