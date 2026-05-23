import { Skeleton } from "@mui/material"
import s from "./Loading.module.scss";

export const Loading = ()=> {
    return (
        <ul className={s.loading_list}>
            {Array(3).fill(true).map((_, i)=> (
                <li
                    key={`load-ex-room-${i}`}
                    className={s.loading_card}
                >
                    <Skeleton
                        className={s.image_skeleton}
                        animation="wave"
                        variant="rectangular"
                    />
                    <div className={s.text_group}>
                        {Array(3).fill(true).map((_, i)=> (
                           <Skeleton
                                key={`sub-load-ex-room-${i}`}
                                className={i == 0 ? s.text_skeleton_wide : s.text_skeleton}
                                animation="wave"
                                variant="rectangular"
                            /> 
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    )
}
