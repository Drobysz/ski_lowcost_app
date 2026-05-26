import { Skeleton } from "@mui/material"

export const Loading = ()=> {
    return (
        <Skeleton
            className="w-full rounded-2xl max-w-112.5:h-10"
            animation="wave"
            height={100}
        />
    )
}