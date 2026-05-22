"use client";

import { SwitchersProps, Dir } from "./Switchers.props";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./style.module.scss";
import cn from "classnames";

export const Switchers = ({
    dir,
    setDir,
    roomId,
    setRoomId,
    lastId
}: SwitchersProps)=> {
    const handleSwitcher = (p_dir: Dir)=> {
        switch (p_dir) {
            case 'left':
                // const leftId = dir == 'left' ? roomId - 1 : roomId - 3;

                setRoomId(Math.max(0, 0))
                setDir('left');
                break;
            
            case 'right':
                // const rightId = dir == 'right' ? roomId + 1 : roomId + 3;

                setRoomId(Math.min(lastId, 6));
                setDir('right');
                break;
        
            default:
                break;
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <div
                className={cn(s.switch, roomId == 0 && "pointer-events-none opacity-40")}
                onClick={()=> handleSwitcher('left')}
            >
                <ChevronLeft />
            </div>

            <div
                className={cn(s.switch, roomId == lastId && "pointer-events-none opacity-40")}
                onClick={()=> handleSwitcher('right')}
            >
                <ChevronRight />
            </div>
        </div>
    )
}