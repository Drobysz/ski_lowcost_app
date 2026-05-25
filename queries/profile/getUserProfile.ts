import { fetchUniversal } from "../fetchUniversal";

export const getUserProfile = async () => {
	return await fetchUniversal("me");
};
