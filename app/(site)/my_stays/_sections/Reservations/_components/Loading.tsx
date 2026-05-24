import { Skeleton } from "@mui/material"

export const Loading = ()=> {
    return (
        <>
            {Array(3).fill(true).map(()=> (
                <div 
                    key={`Stay_load_${crypto.randomUUID()}`}
                    className="flex flex-col gap-4"
                >
                    <Skeleton
                        width={300}
                        height={150}
                    />
                    <div className="flex flex-col gap-1.5">
                        {Array(3).fill(true).map(()=> (
                           <Skeleton
                                key={`Stay_sub_load_${crypto.randomUUID()}`}
                                width={280}
                                height={20}
                            /> 
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}