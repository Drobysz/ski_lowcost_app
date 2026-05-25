import { Dispatch, SetStateAction } from "react";

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
    setSwitch?: Dispatch<SetStateAction<boolean>>
}

export interface ImageProps {
    id: number;
    room_id: number;
    name: string;
    path: string;
    url: string | null;
}