import s from "../style.module.scss";

export const Title = ()=> {
    return (
        <div className={s.title_text}>
            <h3>
                Affordable ski stays
            </h3>
            <div className="flex flex-col">
                <p>
                    Experience the majesty of the Alps without the premium price tag.
                </p>
                <p>
                    Thoughtfully designed rooms for every type of adventurer.
                </p>
            </div>
        </div>
    )
}