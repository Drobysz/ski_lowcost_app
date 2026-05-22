export const fetchRooms = async () => {
    const res = await fetch("/api/rooms");

    if (!res.ok) {
    throw new Error("Failed to fetch rooms");
    }

    const data = await res.json();

    return data.data;
};