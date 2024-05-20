'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TextField } from '@mui/material'

import {
  VERIFY_OTP,
  GENERATE_ENQUIRY,
  UPDATE_CART,
  RESEND_OTP
} from '@/app/API/API_Constets'

const OTP = (props) => {

  const router = useRouter(); // Hook for Navigation

  const { IsLogin, Cust_details, devicedetails, modeldetails, issuedetails, } = props;
  const [InputOTP, setInputOTP] = useState('');
  const [OTPError,SetOTPError] = useState(false);
  const [source, setsource] = useState('');
  const [subsource, setsubsource] = useState('');
  const [timer, setTimer] = useState(30);
  const [ResendAllowed,setIsResendAllowed] = useState(false);
  const [Loading,setLoading] = useState(false);
  const url = window.location.href;
  const fburl = 'fbclid';
  const gurl = 'gclid';
  const fetch_source = () => {
    if (url.includes(fburl)) {
      setsource(3);
      setsubsource(27);
    } else if (url.includes(gurl)) {
      setsource(2);
      setsubsource(26);
    } else {
      setsource(1);
      setsubsource(1);
    }
  }
  const AddTOCART = async (bearer) => {
    try {
      const response = await fetch(UPDATE_CART, {
        method: "POST",
        body: JSON.stringify({
          issueId: issuedetails.issue_id
        }),
        headers: {
          Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Respnse Error Create Enquiry");
      }
      const responseJson= await response.json();
      if(responseJson.success === false){
        console.log("Cart response false");
        return;
      }
      
    } catch (error) {
      console.log("Cart function Error",error);
    }
  }
  // Create Enquiry >> Runs After verifying OTP
  const CreateEnquiry = async (bearer) => {
    try {
      const response = await fetch(GENERATE_ENQUIRY, {
        method: 'POST',
        body: JSON.stringify({
          flowGroup: 1,
          city: 1,
          sourceType: source,
          subSourceType: subsource,
          category: devicedetails.device_id,
          brand: devicedetails.brand_id,
          model_segment: modeldetails.model_id,
          issues: issuedetails.issue_id,
          coupon: 0,
        }),
        headers: {
          Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Respnse Error Create Enquiry");
      }
      const respinseJson = await response.json();
      if (respinseJson.success === false) {
        console.log("Unable to Create Enquiry");
        return;
      }
      else {
        document.cookie = `enquiry_id_encrypted=${respinseJson.enquiry_data.enquiry_id_encrypted}`;
      }
    } catch (error) {
      console.log("Create enquiry Function error",error);
    }
  }

  // Verify-OTP
  const VerifyOTP = async () => {
    if (InputOTP === '') {
      SetOTPError(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(VERIFY_OTP, {
        method: 'POST',
        body: JSON.stringify({
          fullname: Cust_details.cus_name,
          mobile: Cust_details.cus_mobile,
          mobile_otp: InputOTP,
          purpose: IsLogin.otpby
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      if (!response.ok) {
        setLoading(false);
        throw new Error("Respnse Error Verify-OTP");
      }
      const responseJson = await response.json();
      if (responseJson.success === false) {
        console.log("Response Error");
        setLoading(false);
        // POP for OTP ERROR
        return;
      }
      else {
        // Create Enquiry 
        document.cookie = `token=${responseJson.authorisation.token}`;
        const Bearer = 'Bearer ' + responseJson.authorisation.token;
        CreateEnquiry(Bearer);
        AddTOCART(Bearer);
        router.push('/location');
        setLoading(false);
      }

    } catch (error) {
      console.log("Verify OTP ERROR", error);
      setLoading(false);
    }
  }

  // Resend OTP
  const ResendOTP = async()=>{
    setTimer(30);
    setIsResendAllowed(false);
    try {
      const response = await fetch(RESEND_OTP,{
        method: "POST",
          body: JSON.stringify({
            mobile: Cust_details.cus_mobile,
          }),
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
          },
      });
      if(!response.ok){
        throw new Error('Resend OTP response fail');
      }
      const responseJson = await response.json();
      if(responseJson.success === false){
        console.log("Resend OTP No data");
        return;
      }
    } catch (error) {
      console.log("Unable to send OTP: ")
    }
  }


  useEffect(() => {
    fetch_source();
  }, [])
  useEffect(()=>{
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setIsResendAllowed(true);
    }
    return () => clearTimeout(countdown);
  },[timer])


  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='flex justify-between gap-2'>
        <TextField error={OTPError} fullWidth label="Enter OTP" variant='outlined' onChange={(e) => { setInputOTP(e.target.value) }} />
        <button disabled={!ResendAllowed} className={`${ResendAllowed?'bg_primary':'bg_grey'} ${ResendAllowed?"cursor-pointer":"cursor-not-allowed"} text-white text-[14px] md:text-[12px] py-4 px-4 md:px-1 rounded-[5px] w-[50%]`} onClick={()=>ResendOTP()} >Resend OTP {timer > 0 &&<span className='text-[12px] md:text-[10px]'>{timer}</span>}</button>
      </div>
      <button disabled={Loading || !InputOTP} className={`${Loading || !InputOTP?'bg_grey':'bg_primary'} py-4 text-white font-bold text-[18px] rounded-[5px] w-full`} onClick={() => VerifyOTP()}>Check Price For Free</button>
    </div>
  )
}

export default OTP