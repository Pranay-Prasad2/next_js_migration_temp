'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GET_ORDER_DETAILS } from '@/app/API/API_Constets'
const Hero = () => {
    const [EnquiryDetails, setEnquiryDetails] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [TotalAmount,setTotalAmount] = useState();
    const cookies = typeof document !== 'undefined' ? document.cookie : null;
    const tokenMatch = cookies ? cookies.match(/token=([^;]*)/) : null;
    const enquiry_id_Match = cookies ? cookies.match(/enquiry_id_encrypted=([^;]*)/) : null;
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
    const enquiry_id_encrypted = enquiry_id_Match ? decodeURIComponent(enquiry_id_Match[1]) : null;


    const couponAmount = (typeof(window) !== 'undefined')? (localStorage.getItem("amount") === null ? 0 : localStorage.getItem("amount")):0;
    const CouponCode = (typeof(window) !== 'undefined' )?localStorage.getItem("couponcode"):null;
    const FetchEnquiryDetails = async () => {
        try {
            const response = await fetch(GET_ORDER_DETAILS + enquiry_id_encrypted + "", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("fetch enquiry error");
            }
            const responseJson = await response.json();
            if (responseJson.success === false) {
                console.log("reponseJson Error");
                return;
            }
            setEnquiryDetails(responseJson.data[0].order_issues);
            setLoading(false);

        } catch (error) {
            console.log("Fetch Error: ", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        FetchEnquiryDetails();
    }, [])
    useEffect(() => {
        if (EnquiryDetails) {
            let totalAmount = EnquiryDetails.reduce((accumulator, product) => {
                if (accumulator === undefined) {
                    accumulator = product.issue_discounted_price;
                } else {
                    accumulator = parseInt(accumulator) + parseInt(product.issue_discounted_price);
                }
                return accumulator;
            }, undefined)
            totalAmount = parseInt(totalAmount) - parseInt(couponAmount) + 49;
            setTotalAmount(totalAmount);
        }
    }, [EnquiryDetails])
    return (
        <section className="py-8 px-4 sm:px-8">
            <div className='flex flex-col gap-[20px]'>
                <div className='flex flex-col justify-center items-center gap-[5px]'>
                    <Image src={'/assets/images/thank.png'} width={250} height={250} />
                    <p className='font-bold text-[24px] text-center'>Thank You! Your Booking is Confirmed</p>
                </div>
                <div style={{ width: "100%", borderTop: "0.1px solid rgb(179 179 179)", }} />
                <div>
                    <h1 className='font-bold text-[24px]'>Order Details</h1>
                    <br />
                    <div className='flex flex-col gap-[10px]'>
                        <div>
                            {
                                !Loading && EnquiryDetails && EnquiryDetails.map((item, index) => (
                                    <div key={index} className='flex w-full justify-between items-center text-[18px] sm:text-[20px] my-[5px]' >
                                        <p className='font-bold flex flex-col sm:flex-row gap-[2px] sm:gap-[5px] text-[18px] sm:text-[20px]'> <span>{item.issue_name}</span> <span className='text_secondary font-normal text-[15px] sm:text-[18px]'>(Warranty {item.issue_warranty} . Free {item.issue_repair_type})</span></p>
                                        <div className='flex gap-5 sm:gap-10'>
                                            <p className='font-bold'>₹{item.issue_discounted_price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            {CouponCode && <div className='flex w-full justify-between items-center text-[18px] sm:text-[20px]'>
                                <p className='text_green font-bold'>Coupons ({CouponCode})</p>
                                <p className='text_danger' >- ₹{couponAmount}</p>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[24px]'>Tax & Fees</p>
                            <p className='text-[24px]'>₹49</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-[24px]'>Total Amount</p>
                            <p className='text-[24px] font-bold'>₹{TotalAmount}</p>
                        </div>
                    </div>
                    <br />
                    <div>
                        <button className='w-full py-3 text-center bg_green text-white font-bold text-[20px] rounded-[8px]'>Track Booking Status</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero