export const fetchReserves = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch("/api/reserves", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
            credentials: "include",
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