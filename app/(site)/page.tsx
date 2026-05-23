import {
  HeroSection,
  IllustrativeCards,
  RoomsSection,
  NewsLetterSection
} from "./_sections"; 
import s from "./page.module.scss";

export default function Home() {
  return (
    <div className={s.page}>
      <HeroSection />
      <IllustrativeCards />
      <RoomsSection />
      <NewsLetterSection />
    </div>
  )
}
