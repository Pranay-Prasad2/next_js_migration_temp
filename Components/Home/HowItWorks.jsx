'use client'
import Image from "next/image"
import { useEffect,useState } from "react";
const HowItWorks = () => {
  const [autoplay, setAutoplay] = useState(false);

  // Function to check the scroll position and handle video autoplay
  const checkScrollPosition = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= 1000 && scrollPosition <= 3000) {
      setAutoplay(true);
    }
    else {
      setAutoplay(false);
    }
  };

  useEffect(() => {
    // Add an event listener to the scroll event when the component mounts
    window.addEventListener('scroll', checkScrollPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);
  return (
    <section className='pt-8 px-2 sm:px-8 mb-10' >
      <div>
        <h1 className='text-center font-bold text-[28px] sm:text-[40px]'>How It Works</h1>
      </div>
      <div className="flex mt-5 flex-col-reverse sm:flex-row justify-between gap-8">
        <div className='w-[100%] sm:w-[60%] h-[400px] sm:h-[550px] flex flex-col justify-between'>

          <div className="flex items-center justify-between gap-2 sm:gap-8">
            <div className="center_content bg_light_blue rounded-full w-[220px] sm:w-[150px] h-[100px] sm:h-[120px]">
              <Image src="/assets/images/appointment.svg" height={60} width={60} />
            </div>
            <div className="flex flex-col gap-0 sm:gap-1">
              <h4 className="font-bold text-[18px] sm:text-[24px]" >Book an appointment</h4>
              <p className="text_secondary text-[16px] sm:text-[20px]">You can easily book and appointment at your selected time and place of convenience.</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 sm:gap-8">
            <div className="center_content bg_light_blue rounded-full w-[220px] sm:w-[150px] h-[100px] sm:h-[120px]">
              <Image src="/assets/images/visit.svg" height={60} width={60} />
            </div>
            <div className="flex flex-col gap-0 sm:gap-1">
              <h4 className="font-bold text-[18px] sm:text-[24px]" >Technician visits you</h4>
              <p className="text_secondary text-[16px] sm:text-[20px]">Our expert professional visits your residence/office and fixes your device right in front of you.</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 sm:gap-8">
            <div className="center_content bg_light_blue rounded-full w-[220px] sm:w-[150px] h-[100px] sm:h-[120px]">
              <Image src="/assets/images/getback.svg" height={45} width={45} />
            </div>
            <div className="flex flex-col gap-0 sm:gap-1">
              <h4 className="font-bold text-[18px] sm:text-[24px]" >Get your phone good as new</h4>
              <p className="text_secondary text-[16px] sm:text-[20px]">Receive your phone in top condition, as if it was never broken. We don’t compromise on quality</p>
            </div>
          </div>

        </div>
        <div className='center_content w-[100%] sm:w-[30%] h-[550px]'>
          <div className="h-[100%] w-[95%] rounded-[20px] overflow-hidden ">
            <iframe src={`https://www.youtube.com/embed/-FA81CzkEFs?autoplay=${autoplay}&amp;controls=${1}&amp;&mute=1;&showinfo=${0}&amp;rel=0&amp;loop=0&amp;modestbranding=0&amp;wmode=transparent`} style={{ height: "100%", width:"100%" }} ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks