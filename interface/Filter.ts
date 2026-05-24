export type View = "Slopes" | "Parking";
export type Sort = {
    beds?: "up" | "down"; 
}

export type Filter = {
    view?: View[];
    room_size?: number[];
}

export type Available = {
    check_in: string,
    check_out: string,
    filters?: Filter,
    sort?: Sort
}
