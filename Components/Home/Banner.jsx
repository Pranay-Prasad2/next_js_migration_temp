import React from 'react'
import Image from 'next/image'
const Banner = () => {
  return (
    <section className="py-8 px-4 sm:px-8">
      <div className='flex flex-col items-center gap-[2rem] bg_yellow rounded-[10px] p-[2rem]'>
        <h1 className='text_primary text-center text-[30px] sm:text-[40px] font-bold'>Bangalor's Favourite Trusted Service Partner</h1>
        <div className='flex flex-col sm:flex-row gap-[2rem] sm:gap-[4rem] justify-between items-center'>
          <div className='text-center'>
            <p className=' flex justify-center text-[48px] text_primary font-bold'> <Image src={'../assets/images/star.svg'} height={50} width={50} />4.7</p>
            <p className='text-[22px] text_primary'>Star Rating On Google</p>
          </div>
          <hr className='h-[0] sm:h-[60px] w-full sm:w-[0]' style={{border:"1px solid #F6AE2D"}} />
          <div className='text-center'>
            <p className='text-[48px] text_primary font-bold'>12K+</p>
            <p className='text-[22px] text_primary'>Happy Customers Served</p>
          </div>
          <hr className='h-[0] sm:h-[60px] w-full sm:w-[0]' style={{border:"1px solid #F6AE2D"}} />
          <div className='text-center'>
            <p className='text-[48px] text_primary font-bold'>15K+</p>
            <p className='text-[22px] text_primary'>Service Fullfilled</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner