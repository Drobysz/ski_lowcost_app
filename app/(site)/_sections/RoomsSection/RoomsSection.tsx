"use client";

import { useEffect, useState } from "react"
import s from "./style.module.scss";
import useSWR from "swr";
import { fetchRooms } from "@/queries";
import {
    Loading,
    Title,
    Switchers,
    Feed
} from "./_components";
import { Dir } from "./_components/Switchers/Switchers.props";
import { RoomProps } from "@/interface/Room";
import { SectContainer } from "../../_components";

export const RoomsSection = ()=> {
    const {data, isLoading, error} = useSWR(
        'example_rooms',
        fetchRooms,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 60 * 60_000, // 1 hour
        }
    );
    const rooms: RoomProps[] = data;

    const [roomId, setRoomId] = useState(0);
    const [dir, setDir] = useState<Dir>('right');

    useEffect(()=> console.log(roomId), [roomId]);
    
    console.log(rooms)

    return (
        <SectContainer>
            <div className={s.markup}>
                <div className="flex justify-between">
                    <Title />
                    <Switchers
                        roomId={roomId}
                        dir={dir}
                        setDir={setDir}
                        setRoomId={setRoomId}
                        lastId={rooms ? rooms.length - 1 : 0}
                    />
                </div>
                {isLoading && <Loading />}
                {!error && rooms && 
                    <Feed 
                        roomId={roomId}
                        rooms={rooms}
                    />
                }
            </div>
        </SectContainer>
    )
}