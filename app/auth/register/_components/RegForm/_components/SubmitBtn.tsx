import { Btn } from "@/components";
import { CircularProgress } from "@mui/material";

export const SubmitBtn = ({
    pending,
    isFilled
}: {
    pending: boolean
    isFilled: boolean
})=> {
    return (
        <Btn
            colorSet={isFilled ? "blue" : "blue_ghost"}
            form="rect"
            fullWidth
            disabled={!isFilled || pending}
            type="submit"
        >
            {!pending
                ? "Create account"
                : <CircularProgress
                    size={20}
                    color="inherit"
                    aria-label="Loading..."
                  />
            }
        </Btn>
    )
}
