import { Btn } from "@/components";
import s from "./style.module.scss";
import { SectContainer } from "../../_components";

export const NewsLetterSection = ()=> {
    return (
        <SectContainer>
            <article className={s.bounds}>
                <div className="flex flex-col gap-6 items-center">
                    <h3 className="text-gray-950">
                        Ready for slopes?
                    </h3>

                    <p className="max-w-137.5 text-center text-gray-700">
                        Join our newsletter for exclusive early-bird rates and snow reports directly from the peaks.
                    </p>

                    <form className="flex gap-4 justify-center w-full">
                        <input
                            className={s.email_input}
                            type="email"
                            placeholder="Your email address"
                        />
                        <Btn
                            form="round"
                            colorSet="black"
                            className="px-8"
                        >
                            Subscribe
                        </Btn>
                    </form>
                </div>
            </article>
        </SectContainer>
    )
}