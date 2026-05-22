import { Skeleton } from "@mui/material"

export const Loading = ()=> {
    return (
        <ul className="flex justify-center gap-3">
            {Array(3).fill(true).map((_, i)=> (
                <li
                    key={`load-ex-room-${i}`}
                    className="rounded-xl overflow-hidden flex flex-col gap-2"
                >
                    <Skeleton
                        width={306}
                        height={208}
                        animation="wave"
                        variant="rectangular"
                    />
                    <div className="flex flex-col gap-0.5 pl-0.5">
                        {Array(3).fill(true).map((_, i)=> (
                           <Skeleton
                                key={`sub-load-ex-room-${i}`}
                                animation="wave"
                                height={20}
                                width={i == 0 ? 250 : 150}
                                variant="rectangular"
                            /> 
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    )
}