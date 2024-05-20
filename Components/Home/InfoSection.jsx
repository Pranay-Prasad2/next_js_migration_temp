import React from 'react'
import Image from 'next/image'
const InfoSection = () => {
    return (
        <section className="py-8 px-4 sm:px-8">
            {/* Large Scale */}
            <div className="bg_light_blue hidden sm:flex justify-between p-8 rounded-[10px]">
                <div className='flex items-center gap-1'>
                    <Image src="assets/images/Quick.svg" width={50} height={50} />
                    <p className='text-[20px] font-normal'>Quick & Conveninet</p>
                </div>
                <div className='flex items-center gap-1'>
                    <Image src="assets/images/Afford.svg" width={50} height={50} />
                    <p className='text-[20px] font-normal'>Affordable Prices</p>
                </div>
                <div className='flex items-center gap-1'>
                    <Image src="assets/images/tool.svg" width={50} height={50} />
                    <p className='text-[20px] font-normal'>Certified Parts</p>
                </div>
                <div className='flex items-center gap-1'>
                    <Image src="assets/images/warrn.svg" width={50} height={50} />
                    <p className='text-[20px] font-normal'>12 months warranty</p>
                </div>
            </div>

            {/* Mobile View */}

            <div className="grid sm:hidden grid-cols-2 gap-5">
                <div className=' bg_light_blue rounded-[10px] px-4 py-8 flex flex-col justify-center items-center gap-1'>
                    <Image src="assets/images/Quick.svg" width={50} height={50} />
                    <p className=' text-center text-[20px] font-normal'>Quick & Conveninet</p>
                </div>
                <div className=' bg_light_blue rounded-[10px] px-4 py-8 flex flex-col justify-center items-center gap-1'>
                    <Image src="assets/images/Afford.svg" width={50} height={50} />
                    <p className=' text-center text-[20px] font-normal'>Affordable Prices</p>
                </div>
                <div className=' bg_light_blue rounded-[10px] px-4 py-8 flex flex-col justify-center items-center gap-1'>
                    <Image src="assets/images/tool.svg" width={50} height={50} />
                    <p className=' text-center text-[20px] font-normal'>Certified Parts</p>
                </div>
                <div className=' bg_light_blue rounded-[10px] px-4 py-8 flex flex-col justify-center items-center gap-1'>
                    <Image src="assets/images/warrn.svg" width={50} height={50} />
                    <p className=' text-center text-[20px] font-normal'>12 months warranty</p>
                </div>
            </div>
        </section>
    )
}

export default InfoSection