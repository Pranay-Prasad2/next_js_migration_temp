import React from 'react'
import Image from 'next/image'
const ServiceHighlight = () => {
  return (
    <section className='py-4 sm:py-[8] px-4 sm:px-8 bg_light'>
        <h1 className='text-[24px] sm:text-[28px] font-bold'>Service Highlight</h1>
        <br/>
        <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[10px]'>
                <Image src='/assets/images/Quick.svg' width={40} height={40} />
                <p className='text-[17px] sm:text-[22px]'>Most services are done in 30 minutes or less.</p>
            </div>
            <div className='flex items-center gap-[10px]'>
                <Image src='/assets/images/tool.svg' width={40} height={40} />
                <p className='text-[17px] sm:text-[22px]'>Manufacturer/OEM parts and processes used in almost all services.</p>
            </div>
            <div className='flex items-center gap-[10px]'>
                <Image src='/assets/images/expert.svg' width={40} height={40} />
                <p className='text-[17px] sm:text-[22px]'>Well Trained professional with 3+ years experience will come at your doorstep.</p>
            </div>
            <div className='flex items-center gap-[10px]'>
                <Image src='/assets/images/warrn.svg' width={40} height={40} />
                <p className='text-[17px] sm:text-[22px]'>Up to 1-year warranty on services.</p>
            </div>
        </div>
    </section>
  )
}

export default ServiceHighlight