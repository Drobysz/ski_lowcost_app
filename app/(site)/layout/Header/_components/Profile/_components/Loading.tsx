'use client';

import { Skeleton } from "@mui/material"

export const Loading = ()=> {
    return (
        <>
            <Skeleton
                height={25}
                width={50}
                animation="wave"
            />
            <div className="rounded-full overflow-hidden">
                <Skeleton
                    animation="wave"
                    height={30}
                    width={30}
                    variant="rounded"
                />
            </div>
        </>
    )
}