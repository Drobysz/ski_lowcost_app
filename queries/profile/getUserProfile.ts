export const getUserProfile = async ()=> {
    const res = await fetch("/api/me");

	const data = await res.json().catch(() => null);
	if (!res.ok) {
		throw new Error(data?.message ?? "Failed to fetch user");
	}
	return data.data;
}