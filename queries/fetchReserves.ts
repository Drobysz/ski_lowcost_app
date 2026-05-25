import { fetchUniversal } from "./fetchUniversal";

export const fetchReserves = async () => {
	return await fetchUniversal("reserves");
};
