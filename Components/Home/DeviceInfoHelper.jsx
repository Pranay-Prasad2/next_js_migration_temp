import React from 'react'

const DeviceInfoHelper = ({ data = [], pos = '', type = '' }) => {
    return type === 'mobile' ? (
        <div className={`grid grid-cols-2 gap-[2rem]`} >
            {data.map((item, index) => (
                <div key={index}>
                    <h3 className={`text-${pos} text-[22px] font-medium w-full`} style={{ textAlign: pos }} >{item.title}</h3>
                    <p className={`text_secondary text-${pos} text-[18px] w-full`} style={{ textAlign: pos }} >{item.desc}</p>
                </div>
            ))}
        </div>
    ) : (
        <div className={`flex flex-col justify-between items-${pos} gap-[32px]`} >
            {data.map((item, index) => (
                <div key={index}>
                    <h3 className={`text-${pos} text-[22px] font-medium w-full`} style={{ textAlign: pos }} >{item.title}</h3>
                    <p className={`text_secondary text-${pos} text-[18px] w-full`} style={{ textAlign: pos }} >{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default DeviceInfoHelper