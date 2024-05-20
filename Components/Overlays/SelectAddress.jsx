'use client'

import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
const SelectAddress = (props) => {
    const router = useRouter();
    const { UserAddress, setStep, step } = props;
    const [SelectedAddress, setSelectedAddress] = useState(0);
    const handleChange = () => {
        if(typeof(window) !== 'undefined'){
            localStorage.setItem('addressId',UserAddress[SelectedAddress].address_id);
        }
        router.push('/conform-order');
        // setStep(step+1);
    }
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className='px-[1rem] sm:px-[6rem] py-[2rem]'>
                <div>
                    {UserAddress && UserAddress.slice(0, 5).map((item, index) => (
                        <div className='flex items-center gap-[20px] cursor-pointer border_bottom p-2' onClick={() => setSelectedAddress(index)}>
                            <input type="radio" checked={index === SelectedAddress ? true : false} width={50} height={50} />
                            <div>
                                <p className='font-semibold cap'>{item.address_type_title}</p>
                                <p className='text_secondary'>{item.address_line_1}</p>
                            </div>
                        </div >
                    ))}
                </div>
                <div className='mt-[2rem] flex items-center gap-[10px] cursor-pointer' onClick={() => setStep(3)}>
                    <AddCircleOutlineIcon />
                    <h1 className='font-bold text-[20px]'>Add New Address</h1>
                </div>
            </div >
            <div className='flex justify-center'>
                <button className={`bg_primary px-8 py-5 rounded-[5px] text-white font-bold w-full sm:w-[250px]`} onClick={() => handleChange()} >Conform & Proceed</button>
            </div>
        </div>
    )
}

export default SelectAddress