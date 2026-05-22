export type view = 'parking' | 'mountains';

export interface RoomProps {
    id: number;
    num: number;
    nb_lits: number;
    building_id: number;
    floor: number;
    surface: number;
    view: view;
    balcony: boolean;
    images: ImageProps[];
}

export interface ImageProps {
    id: number;
    room_id: number;
    name: string;
    path: string;
    url: string | null;
}