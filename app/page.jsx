import Banner from "@/Components/Home/Banner"
import Compare from "@/Components/Home/Compare"
import Device from "@/Components/Home/Device"
import Hero from "@/Components/Home/Hero"
import Highlights from "@/Components/Home/Highlights"
import HowItWorks from "@/Components/Home/HowItWorks"
import InfoSection from "@/Components/Home/InfoSection"

const Home = () => {
  return (
    <section>
      <Hero/>
      <Device/>
      <HowItWorks/>
      <InfoSection/>
      <Highlights/>
      <Compare/>
      <Banner/>
    </section>
  )
}

export default Home