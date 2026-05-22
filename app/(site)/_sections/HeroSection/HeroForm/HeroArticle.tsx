import s from "./style.module.scss";
import {
    Title,
    HeroInput
} from "./_components";

export const HeroArticle = ()=> {
    return (
        <article
            className={s.hero_form}
        >
            <Title />
            <HeroInput />
        </article>
    )
}