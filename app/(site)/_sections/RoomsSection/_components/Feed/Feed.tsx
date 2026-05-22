import { useEffect, useRef } from "react";
import s from "./style.module.scss";
import { RoomProps } from "@/interface/Room";
import { RoomCard } from "@/components";

export const Feed = ({ roomId, rooms }: { roomId: number, rooms: RoomProps[] })=> {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
            const container = containerRef.current;
            const el = itemsRef.current[roomId];
    
            if (!el) return;
    
            container?.scrollTo({
                behavior: "smooth",
                left: el.offsetLeft - container.offsetLeft
            });
    
            if (roomId === 0) {
                container!.scrollTo({ left: 0, behavior: 'smooth' });
                return;
            }
    
        }, [roomId]);

    return (
        <div 
            className={s.feed}
            ref={containerRef}
        >
            {rooms.map((r, i)=> (
                <div
                    key={`ex-key-rm-${i}`}
                    ref={(el) => {
                        itemsRef.current[i] = el;
                    }}
                >
                    <RoomCard
                        key={`ex-key-rm-${i}`}
                        num={r.num}
                        floor={r.floor}
                        surface={r.surface}
                        view={r.view}
                        balcony={r.balcony}
                        images={r.images}
                        nb_lits={r.nb_lits}
                        id={r.id}
                        building_id={r.building_id}
                    />
                </div>
            ))}
        </div>
    )
}