export const getUserProfile = async () => {
	const res = await fetch("/api/me", {
	credentials: "include",
	});

	if (res.status === 401) {
	return null;
	}

	if (!res.ok) {
	throw new Error("Failed to load user profile");
	}

	return res.json();
};
