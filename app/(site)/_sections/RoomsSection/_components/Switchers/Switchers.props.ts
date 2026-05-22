export type Dir = 'left' | 'right' | 'none';

export interface SwitchersProps {
    roomId: number;
    dir: Dir;
    setDir: (e: Dir)=> void;
    setRoomId: (e: number)=> void;
    lastId: number;
}