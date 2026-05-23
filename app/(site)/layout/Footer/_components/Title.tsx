import { jakarta_bold } from "@/fonts/fonts";
import cn from "classnames";

export const Title = ()=> {
    return (
        <div className="flex flex-col max-[400px]:gap-1">
            <h3 className={cn(
                jakarta_bold.className,
                "text-xl"
            )}>
                Zarza-Ski
            </h3>
            <p className="text-gray-700 max-[400px]:text-sm max-[400px]:text-center">
                {`© ${(new Date()).getFullYear()} Zarza-Ski. Elevated Alpine Hospitality.`}
            </p>
        </div>
    )
}