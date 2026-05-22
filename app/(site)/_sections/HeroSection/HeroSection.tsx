import s from "./style.module.scss";
import { HeroArticle } from "./HeroForm/HeroArticle";

export const HeroSection = ()=> {
    return (
        <section className={s.hero_bgnd}>
            <div className={s.hero_inner}>
                <HeroArticle />
            </div>
        </section>
    )
}