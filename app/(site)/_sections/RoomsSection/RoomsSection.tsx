"use client";

import { useContext, useState } from "react"
import s from "./style.module.scss";
import { GlobalContext } from "@/app/context/global.context";
import {
    Loading,
    Title,
    Switchers,
    Feed
} from "./_components";
import { Dir } from "./_components/Switchers/Switchers.props";
import { SectContainer } from "../../_components";

export const RoomsSection = ()=> {
    const {
        rooms,
        isRoomsLoading,
        roomsError
    } = useContext(GlobalContext);

    const [roomId, setRoomId] = useState(0);
    const [dir, setDir] = useState<Dir>('right');

    return (
        <SectContainer>
            <div className={s.markup}>
                <div className={s.header_bar}>
                    <Title />
                    <Switchers
                        roomId={roomId}
                        dir={dir}
                        setDir={setDir}
                        setRoomId={setRoomId}
                        lastId={rooms ? rooms.length - 1 : 0}
                    />
                </div>
                {isRoomsLoading && <Loading />}
                {!roomsError && rooms && 
                    <Feed 
                        roomId={roomId}
                        rooms={rooms}
                    />
                }
            </div>
        </SectContainer>
    )
}
