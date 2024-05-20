'use client'
import { use, useEffect, useState } from 'react'

import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import Device_DropDown from '../utils/Home/Device_DropDown'
import Brand_DropDown from '../utils/Home/Brand_DropDown'
import Issue_Dropdown from '../utils/Home/Issue_Dropdown'
import { TextField,Skeleton } from '@mui/material'
import OTP from '../utils/Home/OTP'
import { SEND_LOGIN_OTP } from '@/app/API/API_Constets'
import FeedBack from '../utils/SnackBar/FeedBack'
import { CheckPhoneNumber, ClearCart } from '@/app/util/functions_helper'
const Hero = () => {
  const [DropDownStep, setDropDownStep] = useState(1); // Counter to show differnt down
  const [ShowOTP, setShowOTP] = useState(false);
  const [Loading,setLoading] = useState(false);

  const [FeedbackMessage,setFeedbackMessage] = useState('');
  const [Type,setType] = useState('');
  const [DisableButton,setDisableButton] = useState(false);

  // Store the resposnse from Dropdown Device .... Modal .... Isseues
  const [devicedetails, setdevicedetails] = useState({
    device_name: '',
    device_id: '',
    brand_id: ''
  });
  const [modeldetails, setmodeldetails] = useState({
    model_name: '',
    model_id: '',
  });
  const [issuedetails, setissuedetails] = useState({
    issue_name: '',
    issue_id: ''
  })

  // Personal Details
  const [Name, setName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [IsLogin, setIsLogin] = useState({
    otpby: '',
  })
  const [Cust_details, setCust_details] = useState({
    cus_name: '',
    cus_mobile: ''
  })
  // Validation of form 
  const ValidateForm = async () => {
    setDisableButton(true);
    if(!Name){
      setFeedbackMessage('Enter Name');
      setType('warning');
      setDisableButton(false);
      return;
    }
    if(!PhoneNumber){
      setFeedbackMessage('Enter valid Phone Number');
      setType('warning');
      setDisableButton(false);
      return;
    }
    if(!CheckPhoneNumber(PhoneNumber)){
      setFeedbackMessage('Enter valid Phone Number');
      setType('warning');
      setDisableButton(false);
      return;
    }
    if (!devicedetails.device_id || !issuedetails.issue_id) {
      setFeedbackMessage('Issue Not Selected');
      setType('warning');
      setDisableButton(false);
      return;
    }
    try {
      const resposnse = await fetch(SEND_LOGIN_OTP, {
        method: 'POST',
        body: JSON.stringify({
          mobile: PhoneNumber,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (!resposnse.ok) {
        setFeedbackMessage('Unable to Send OTP');
        setType('error');
        throw new Error('Failed to Send OTP');  
      }
      const respinseJson = await resposnse.json();
      if (respinseJson.success === false) {
        setFeedbackMessage('Unable to Send OTP');
        setType('error');
        setDisableButton(false);
        return;
      }
      const NextStep = {
        otpby: respinseJson.purpose
      }
      setIsLogin(NextStep);
      const PersonalDetails = {
        cus_name: Name,
        cus_mobile: PhoneNumber
      }
      setCust_details(PersonalDetails);
      setShowOTP(true);
      setFeedbackMessage('OTP Sent');
      setType('success');
      setDisableButton(false);

    } catch (error) {
      console.error('An error occurred:', error.message);
      // Peding : POP for Error
      setDisableButton(false);
    }
    setDisableButton(false);
  }
  useEffect(()=>{
    ClearCart();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  },[])
  return (
    <section className="hero_main px-2 sm:px-8">
      <div className="flex flex-col gap-5">
        <div className='flex flex-col'>
          <h1 className=' font-bold leading-1 sm:leading-normal text-[28px] sm:text-[40px] '>Rapid Tech Care: Because Your Devices Deserve the Best!</h1>
          <p className='text_secondary text-[18px] sm:text-[22px] ' >Book a service with our experts and get your smartphone serviced at your home. We take care of all device issues like screen damage, battery, speaker, charging, and a lot more.</p>
        </div>
        <div className='relative'>
          {/* zIndex:items&&load?'-1':'500', */}
        <Skeleton variant="rectangular" className='h-[16px]' sx={{ zIndex: Loading?'500':'-1',position:"absolute",top:"0", left:"0", right:"0", bottom:"0",backgroundColor:"transparent"}} />
          <Carousel
          disableNextButton 
          disablePrevButton 
            indicators={false}
            fullWidth
            sx={{zIndex: Loading?'-1':'500'}}
          >
            <Image src="/assets/images/banner1.png"  width={700} height={90} />
            <Image src="/assets/images/banner2.png"  width={700} height={90} />
            <Image src="/assets/images/banner3.png"  width={700} height={90} />
          </Carousel>
          {/* <Carousal/> */}
        </div>
      </div>
      <div className=' flex flex-col justify-between gap-[5px]'>
        <div className="flex align-center flex-col justify-center gap-[50px] shadow r-[15px] p-[1rem] sm:p-[2rem] h-full">
          <h1 className='text-center font-bold text-[20px]'>Fill this form and get quotes instantly</h1>
          <div className='flex flex-col justify-between h-[70%] gap-[10px] '>
            {DropDownStep === 1 && <Device_DropDown DropDownStep={DropDownStep} setDropDownStep={setDropDownStep} setdevicedetails={setdevicedetails} />}
            {DropDownStep === 2 && <Brand_DropDown DropDownStep={DropDownStep} setDropDownStep={setDropDownStep} devicedetails={devicedetails} setmodeldetails={setmodeldetails} />}
            {DropDownStep === 3 && <Issue_Dropdown DropDownStep={DropDownStep} setDropDownStep={setDropDownStep} modeldetails={modeldetails} setissuedetails={setissuedetails} />}

            <TextField variant='outlined' fullWidth label="Name" required onChange={(e) => { setName(e.target.value) }} />
            <TextField variant='outlined' fullWidth label="Phone" required onChange={(e) => { setPhoneNumber(e.target.value) }} />
            {/* OTP Page */}
            {ShowOTP &&
             <OTP 
              IsLogin={IsLogin} 
              Cust_details={Cust_details} 
              devicedetails={devicedetails} 
              modeldetails={modeldetails} 
              issuedetails={issuedetails}
              setFeedbackMessage={setFeedbackMessage}
              setType={setType}
               />}
            {!ShowOTP && <button disabled={DisableButton} className={`${DisableButton?'bg_grey':'bg_primary'} ${DisableButton?'cursor-not-allowed':'cursor-pointer'} py-4 text-white font-bold text-[18px] rounded-[5px]`} onClick={() => ValidateForm()} >Check Price For Free</button>}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <Image src='assets/images/ISO.svg' height={100} width={100} />
          <div className='Hero_icon_partions' />
          <Image src='assets/images/warranty.svg' height={80} width={80} />
          <div className='Hero_icon_partions' />
          <Image src='assets/images/rating.svg' height={100} width={100} />
        </div>
      </div>
      <FeedBack message={FeedbackMessage} Type={Type} />
    </section>
  )
}

export default Hero