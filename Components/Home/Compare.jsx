import React from 'react'
import Image from 'next/image'

const Compare = () => {
  return (
    <section className="py-8 px-4 sm:px-8">
        <div>
            <h1 className="text-center font-bold text-[28px] sm:text-[40px]">We always Outperform</h1>
        </div>
        <br/>
        <div className='flex justify-center gap-5 sm:gap-12'>
            <div className='bg_light_blue center_content flex-col p-[20px] rounded-[10px] w-[50%] sm:w-[30%]' >
                <div className=' h-[80px] sm:h-[130px] center_content'>
                    <Image src="/assets/images/logo.png" height={100} width={200} />
                </div>
                <br/>
                <div className='flex flex-col justify-between gap-8'>
                    <div className='flex gap-2 items-center h-[50px] '>
                        <Image src="/assets/Compare/lowprice.svg" height={30} width={30} />
                        <p className=' text-[16px] sm:text-[18px]'>Lowest Price Guaranteed</p>
                    </div>
                    <div className='flex gap-2 items-center h-[50px] '>
                        <Image src="/assets/Compare/doorstep.svg" height={30} width={30} />
                        <p className=' text-[16px] sm:text-[18px]'>Doorstep Service</p>
                    </div>
                    <div className='flex gap-2 items-center h-[50px] '>
                        <Image src="/assets/Compare/time.svg" height={30} width={30} />
                        <p className=' text-[16px] sm:text-[18px]'>Track your service Real-Time</p>
                    </div>
                    <div className='flex gap-2 items-center h-[50px] sm:h-[80px]'>
                        <Image src="/assets/Compare/payafter.svg" height={30} width={30} />
                        <p className=' text-[16px] sm:text-[18px]'>Pay After Service</p>
                    </div>
                    <div className='flex gap-2 items-center h-[50px] '>
                        <Image src="/assets/Compare/nohidden.svg" height={30} width={30} />
                        <p className=' text-[16px] sm:text-[18px]'>No Hidden Fees</p>
                    </div>
                    <div className='flex gap-2 items-center h-[50px] '>
                        <Image src="/assets/Compare/instant.svg" height={30} width={30} />
                        <p className=' text-[16px] sm:text-[18px]'>Instant Quotation</p>
                    </div>
                </div>
            </div>
            <div className=' box_shadow flex items-center flex-col p-[20px] rounded-[10px] w-[20%] justify-start '>
                <div className='center_content flex-col  h-[80px] sm:h-[130px]'>
                    <Image src="/assets/Compare/other.svg" className='hidden sm:block' height={100} width={100} />
                    <p>Other Online Service</p>
                </div>
                <br/>
                <div className='flex flex-col justify-between gap-8 sm:gap-10'>
                    <Image src="/assets/Compare/2rp.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/correct.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                </div>
            </div>
            <div className=' box_shadow flex items-center flex-col p-[20px] rounded-[10px] w-[20%] justify-start'>
                <div className='center_content flex-col  h-[80px] sm:h-[130px]'>
                    <Image src="/assets/Compare/AuthService.svg" className='hidden sm:block' height={60} width={60} />
                    <p>Autorised Service Center</p>
                </div>
                <br/>
                <div className='flex flex-col justify-between gap-8 sm:gap-10'>
                    <Image src="/assets/Compare/3rp.svg" className='h-[50px]' height={40} width={40}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/correct.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/correct.svg" className='h-[50px]' height={30} width={30}/>
                    <Image src="/assets/Compare/wrong.svg" className='h-[50px]' height={30} width={30}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Compare