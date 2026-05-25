export type CreateStripeCheckoutPayload = {
    reservation_id: number;
    final_price: number;
    currency: "eur";
    title: string;
};

export type StripeCheckoutResponse = {
    checkout_url: string;
};

export const createStripeCheckout = async (
    payload: CreateStripeCheckoutPayload,
): Promise<StripeCheckoutResponse> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
        const res = await fetch("/api/post?item=stripeCheckout&method=POST", {
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
            throw new Error(data?.message ?? "Failed to start Stripe checkout");
        }

        return data.data;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Stripe checkout request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};
