import { Btn } from "@/components"
import { Skeleton } from "@mui/material"

export const SaveBtn = ({
    pending
}: {
    pending: boolean
})=> {
    return (
        <Btn
            type="submit"
            colorSet="green"
            form="rect"
            className="self-end"
        >
            {!pending
                ? "Save" 
                : <Skeleton
                    width={10}
                    height={10}
                />
            }
        </Btn>
    )
}