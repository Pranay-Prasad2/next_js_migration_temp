'use client'
import { useState, useEffect } from 'react'
import { generateDates, getDay, getMonth, nthDay, isTomorrow, fetchTimeSlots } from '@/app/util/functions_helper/CheckoutServices';
import { Step } from '@mui/material';

const DateTime = (props) => {
    const { step, setStep } = props;
    const GetDates = useState(generateDates());
    const [DateSelected, setDateSelected] = useState('');
    const [TimeSelected, setTimeSelected] = useState('');
    const [TimeSlots, setTimeSlots] = useState([]);
    const handleChange = () => {
        setStep(step + 1);
    }
    const generateDateButtons = () => {
        return GetDates[0].map((item, index) => (
            <DateComponent value={item} valueKey={DateSelected} key={index} setDateSelected={setDateSelected} />
        ))
    }

    const generateTimeSlots = () => {
        return TimeSlots.map((item, index) => (
            <TimeComponent label={item.title} valueKey={TimeSelected} value={item.id} setTimeSelected={setTimeSelected} />
        ))
    }

    const dates = generateDateButtons();
    const timeslots = generateTimeSlots();

    const getTimeSlots = async () => {
        setTimeSlots(await fetchTimeSlots());
    }
    useEffect(() => {
        getTimeSlots();
    }, [DateSelected])


    return (
        <div className='flex flex-col gap-[10px]'>

            <div className='flex flex-col gap-[20px] my-[20px]'>
                <div className='flex flex-col gap-[10px]'>
                    <h2 className='font-bold text-[20px]'>Select Date</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-5 gap-[10px] place-items-center'>
                        {/* <div className='text-white w-[130px] h-[120px] rounded-[8px] flex flex-col gap-[10px] justify-center items-center cursor-pointer primary_hover'>
                        <div className='flex gap-[5px] '>
                        <p>Thrusday</p>
                        <p>7th</p>
                        </div>
                        <p>Today</p>
                    </div> */}
                        {dates.slice(0, 4)}
                    </div>
                </div>
                <div className='flex flex-col gap-[10px]'>
                    <h2 className='font-bold text-[20px]'>Select Time</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-5 gap-[10px]'>
                        {/* <div className='primary_hover cursor-pointer w-[150px] h-[60px] rounded-[5px] flex justify-center items-center text-white '>
                        <p className='font-bold'>2-3px</p>
                    </div> */}
                        {timeslots}
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button disabled={!DateSelected && !TimeSelected} className={`${DateSelected && TimeSelected?'bg_primary':'bg_grey'} px-8 py-5 rounded-[5px] text-white font-bold`} onClick={()=>handleChange()} >Conform & Proceed</button>
            </div>
        </div>
    )
}

export default DateTime




// Date Component
const DateComponent = ({
    value = new Date(),
    valueKey = new Date(),
    index = 0,
    setDateSelected
}) => {
    const checkDisplayMonth = () => {
        if (isTomorrow(value, false)) return "Today";
        else if (isTomorrow(value, true)) return "Tomorrow";
        else return getMonth(value);
    };

    const SetDateLocal = () => {
        const date = `${value.getDate()}${nthDay(value)}`;
        if (typeof (window) !== 'undefined') {
            localStorage.setItem('selecteddate', value);
            localStorage.setItem('displayDate', date);
            localStorage.setItem('displayMonth', checkDisplayMonth());
        }
        setDateSelected(value);
    }
    return (
        <div className={`text-white w-[130px] h-[120px] rounded-[8px] flex flex-col gap-[10px] justify-center items-center cursor-pointer ${valueKey === value ? 'primary_hover' : 'box_class'}`} onClick={() => SetDateLocal()}>
            <div className='flex gap-[5px] font-bold'>
                <p>{getDay(value)}</p>
                <p> {value.getDate()}{nthDay(value)}</p>
            </div>
            <p className='font-bold'>{checkDisplayMonth()}</p>
        </div>
    )
}


// Time Component
const TimeComponent = ({
    label = "",
    valueKey = "",
    value = "",
    setTimeSelected
}) => {
    const setTimeLocal = () => {
        if (typeof (window) !== 'undefined') {
            localStorage.setItem('selectedTime', label);
            localStorage.setItem('selectedTimeId', value);
        }
        setTimeSelected(value)
    }

    return (
        <div className={`cursor-pointer w-[150px] h-[60px] rounded-[5px] flex justify-center items-center text-white ${valueKey === value ? 'primary_hover' : 'box_class'} `} onClick={() => setTimeLocal()}>
            <p className='font-bold'>{label}</p>
        </div>
    )
}