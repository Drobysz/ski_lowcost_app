export type Room = {
    id: number;
    num: number;
    nb_lits: number;
    building_id: number;
    floor: number;
    surface: number;
    view: "parking" | "mountains";
    balcony: boolean;
    images: Image[];
};

export type Image = {
    id: number;
    room_id: number;
    name: string;
    path: string;
    url: string | null;
};

export type Accommodation = {
    id: number;
    reservation_id: number;
    room_id: number | null;
    room: Room | null,
    client_id: number;
};

export type ReserveStatus = "not paid" | "paid" | "approaching" | "in process" | "finished" | "cancelled";

export type Reservation = {
    id: number;
    client_id: number;
    check_in: string;
    check_out: string;
    purchase_date: string | null;
    status: "not paid" | "paid" | "approaching" | "in process" | "finished" | "cancelled";
    total_price: string | null;
    stripe_session_id: string | null;
    paid_at: string | null;
    accommodations: Accommodation[];
};