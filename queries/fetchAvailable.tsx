import { Available } from "@/interface/Filter";

export const fetchAvailable = async (available: Available) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch(`/api/post?item=available&method=POST`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
            credentials: "include",
            body: JSON.stringify(available)
        });

        const payload = await res.json().catch(() => null);
        if (!res.ok) {
            if (res.status == 401) {
                throw new Error("Unauthorized access");
            }
            console.log(res.status)

            throw new Error(payload?.message ?? "Failed to fetch rooms");
        }

        return payload.data;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Rooms request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};