import { Dispatch, SetStateAction } from "react";
import type { KeyedMutator } from "swr";
import { AuthStatus, UserSession } from "@/interface";
import { RoomProps } from "@/interface/Room";

export type ModalWindow = "Profile" | "none";

export interface GlobalContextInterface {
    isLoggedIn: AuthStatus;
    modalWindow: ModalWindow;
    blur: boolean;
    user?: UserSession;
    isUserLoading: boolean;
    userError?: Error;
    rooms?: RoomProps[];
    isRoomsLoading: boolean;
    roomsError?: Error;
    mutateUser: KeyedMutator<UserSession>;
    mutateRooms: KeyedMutator<RoomProps[]>;

    setIsLoggedIn: Dispatch<SetStateAction<AuthStatus>>;
    setModalWindow: Dispatch<SetStateAction<ModalWindow>>;
}
