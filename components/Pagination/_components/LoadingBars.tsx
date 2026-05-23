import { Skeleton } from "@mui/material"

export const LoadingBars = () => {
    return (
        <>
            {[...Array(3)].map((_, i) => 
                <Skeleton
                    key={i}
                    variant="rectangular"
                    width={60}
                    height={20}
                    animation="wave"
                    className="rounded-4xl"
                />
            )}
        </>
    )
}