type Endpoint = "reserves" | "me" | "users";

export const fetchUniversal = async (endpoint: Endpoint, params?: Record<string, string>) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);
    const searchParams = new URLSearchParams({ item: endpoint });

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value.trim()) {
                searchParams.set(key, value.trim());
            }
        });
    }

    try {
        const res = await fetch(`/api/get?${searchParams.toString()}`, {
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
            if (res.status == 401) {
                throw new Error("Unauthorized access");
            }

            throw new Error(data?.message ?? "Failed to fetch");
        }

        return data.data;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};
