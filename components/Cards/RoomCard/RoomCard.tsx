import { RoomProps } from "./RoomCard.props";
import {
    Info,
    ImageSwitcher
} from "./_components";

export const RoomCard = ({
    num, 
    nb_lits, 
    floor, 
    surface, 
    view, 
    balcony, 
    images,
    setSwitch 
}: RoomProps) => {
    return(
        <article className="flex flex-col gap-3 p-1 w-fit">
            <ImageSwitcher 
                images={images}
                nb_lits={nb_lits}
            />

            <Info 
                view={view} 
                surface={surface} 
                balcony={balcony} 
                floor={floor} 
                num={num} 
                onClick={()=> setSwitch && setSwitch(p=>!p)}
            />
        </article>
    )
}