import s from "./style.module.scss";

export const SignUpNote = ()=> {
    return (
        <div className="flex items-center justify-center">
            <article className={s.signup_note_body}>
                Sign up to make reservations
            </article>
        </div>
    )
}