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
    images 
}: RoomProps) => {
    return(
        <article className="flex flex-col gap-3 p-1">
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
            />
        </article>
    )
}