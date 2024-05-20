'use client'
import { useState } from "react";
import Image from "next/image";
import { DeviceInfo } from "@/public/constant/data/Data";

import DeviceInfoHelper from "./DeviceInfoHelper";
const Device = () => {
    const [deviceToggle, setDeviceToggle] = useState(false); // false == Phone && true == Laptop
    return (
        <section className='flex flex-col items-center gap-5 px-2 sm:px-8 py-8' >
            <div>
                <h1 className='text-center font-bold text-[28px] sm:text-[40px]'>Fixes For Every Problem</h1>
                <p className='text_secondary text-center text-[18px] sm:text-[20px]'  >Why roam everywhere when you can get all your phone issue resolved anytime,anywhere.</p>
            </div>
            <div className="w-full">
                <div className='flex justify-center items-center gap-3'>
                    <p className={`${!deviceToggle ? 'text_primary' : 'text_secondary'} text-[22px] cursor-pointer`} onClick={() => setDeviceToggle(deviceToggle ^ 1)} >Phone</p>
                    <p className="text_secondary text-[24px]" >|</p>
                    <p className={`${deviceToggle ? 'text_primary' : 'text_secondary'} text-[22px] cursor-pointer`} onClick={() => setDeviceToggle(deviceToggle ^ 1)} >Laptop</p>
                </div>
                <br/>
                {/* Large Device Info Splitter */}
                {!deviceToggle ?
                    <div className="lg_visibile grid-cols-3 bg_light_blue w-full p-16 min-h-[595px] rounded-[20px]  " >
                        <DeviceInfoHelper data={DeviceInfo.MobileLeft} pos="end" type="laptop" />
                        <div className="flex items-center justify-center" >
                            <Image src='/assets/images/Bg_Mobile.png' height={300} width={200} />
                        </div>
                        <DeviceInfoHelper data={DeviceInfo.MobileRight} pos="start" type="laptop" />
                    </div> :
                    <div className="lg_visibile grid-cols-3 bg_light_blue w-full p-16 min-h-[595px] rounded-[20px]  " >
                        <DeviceInfoHelper data={DeviceInfo.LaptopLeft} pos="end" type="laptop" />
                        <div className="flex items-center justify-center" >
                            <Image src='/assets/images/Bg_Laptop.png' height={500} width={300} />
                        </div>
                        <DeviceInfoHelper data={DeviceInfo.LaptopRight} pos="start" type="laptop" />
                    </div>
                }
                {/* Mobile Device Info splitter */}
                {!deviceToggle ?
                    <div className=" sm_visible bg_light_blue w-full p-[10px] flex-col items-center gap-8 rounded-[20px] " >
                        <div className="rounded-full w-[256px] h-[256px] overflow-hidden bg-white flex justify-center align-center" >
                            <Image src='/assets/images/Bg_Mobile.png' height={50} width={150} />
                        </div>
                        <DeviceInfoHelper data={DeviceInfo.MobileMain} pos="left" type="mobile" />
                    </div> :
                    <div className=" sm_visible bg_light_blue w-full p-[10px] flex-col items-center gap-8 rounded-[20px] " >
                        <div className="rounded-full w-[256px] h-[256px] overflow-hidden bg-white flex justify-center items-center" >
                            <Image src='/assets/images/Bg_Laptop.png' height={100} width={150} />
                        </div>
                        <DeviceInfoHelper data={DeviceInfo.LaptopMain} pos="left" type="mobile" />
                    </div>
                }
            </div>
        </section>
    )
}

export default Device