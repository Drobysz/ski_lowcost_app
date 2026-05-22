import cards from "./cards";
import { CardSample } from "./CardSample/CardSample";
import { IconName } from "./CardSample/CardSample.props";
import s from "./style.module.scss";
import { SectContainer } from "@/app/(site)/_components/index";

export const IllustrativeCards = ()=> {
    return (
        <SectContainer>
            <ul className={s.ill_cards_markup}>
                {cards.map((o, i)=> (
                    <li
                        key={`ill_card_${i}`}
                        className="flex justify-center min-w-0"
                    >
                        <CardSample
                            icon={o.icon as IconName}
                            title={o.title}
                            text={o.text}
                        />
                    </li>
                ))}
            </ul>
        </SectContainer>
    )
}