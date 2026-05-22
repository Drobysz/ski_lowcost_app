import {
  HeroSection,
  IllustrativeCards,
  RoomsSection,
  NewsLetterSection
} from "./_sections"; 

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection />
      <IllustrativeCards />
      <RoomsSection />
      <NewsLetterSection />
    </div>
  )
}
