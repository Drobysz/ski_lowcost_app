import { InfoProps } from "./Info.props"
import Surface from "@/assets/surface.svg";
import Floor from "@/assets/floor.svg";
import Balcony from "@/assets/balcony.svg";
import { capitalize } from "@/helper/string";

export const Info = ({ view, surface, balcony, floor, num, ...props }: InfoProps) => {
    return (
        <div 
            {...props}
            className="flex flex-col gap-1.5"
        >
            <h3>
                Room №{num}
            </h3>
            <div className="flex flex-col">
                <div className="flex gap-3">
                    <div className="flex items-center gap-1"><Floor /> <span>{floor}</span> Floor</div>
                    <div className="flex items-center gap-1"><Surface /> <span>{surface}</span> m²</div>
                </div>
                <div className="flex gap-1 items-center">
                    <Balcony />
                    <p className="flex gap-2">
                        <span>{balcony ? "With Balcony" : "No Balcony"}</span>
                        <span>{"  •  "}</span>{capitalize(view)}
                        <span>View</span>
                    </p>
                </div>
            </div>
        </div>
    )
}