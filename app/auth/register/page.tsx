import s from './markup.module.scss';
import { Aside, RegForm } from "./_components";

export default function RegisterPage() {
    return (
        <section className={s.register_form_markup}>
            <Aside className={s.aside_part} />
            <RegForm className={s.form_part} />
        </section>
    )
}