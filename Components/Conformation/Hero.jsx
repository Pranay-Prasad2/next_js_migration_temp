'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { GET_ENQUIRY_DETAILS, UPDATE_CART } from '@/app/API/API_Constets'
import ConformationDialouge from '../Overlays/ConformationDialouge'
import AddMoreIssue from '../Overlays/AddMoreIssue'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CouponDialog from '../Overlays/CouponDialog'
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material'
const Hero = () => {

    const [EnquiryDetails, setEnquiryDetails] = useState([]);
    const [ItemsinCart, setItemsinCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [TotalAmount, setTotalAmount] = useState();
    const [Open, setOpen] = useState(false);
    const [OpenIssue, setOpenIssue] = useState(false);
    const [OpenCoupon, setOpenCoupon] = useState(false);
    const [CouponApplied, setCouponApplied] = useState(false);


    const cookies = typeof document !== 'undefined' ? document.cookie : null;
    const tokenMatch = cookies ? cookies.match(/token=([^;]*)/) : null;
    const enquiry_id_Match = cookies ? cookies.match(/enquiry_id_encrypted=([^;]*)/) : null;
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
    const enquiry_id_encrypted = enquiry_id_Match ? decodeURIComponent(enquiry_id_Match[1]) : null;

    // Now you can use token and enquiry_id_encrypted outside of useEffect


    const FetchCart = async () => {
        try {
            const response = await fetch(UPDATE_CART, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Cart items fetch error");
            }
            const responseJson = await response.json();
            if (response.success === false) {
                console.log("Cart items Response error");
                return;
            }
            setItemsinCart(responseJson.data);

        } catch (error) {
            console.log("Unable to Fetch Cart", error);
        }
    }
    const FetchEnquiryDetails = async () => {
        try {
            const response = await fetch(GET_ENQUIRY_DETAILS + enquiry_id_encrypted + "", {
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
            setEnquiryDetails(responseJson.data);
            setLoading(false);

        } catch (error) {
            console.log("Fetch Error: ", error);
            setLoading(false);
        }
    }

    const RemoveCoupon = () => {
        setCouponApplied(false);
        const amount = localStorage.getItem("amount");
        let new_TotalAmount = parseInt(TotalAmount) + parseInt(amount);
        setTotalAmount(new_TotalAmount);
        if(typeof(window) !== 'undefined' ){
            localStorage.removeItem("couponcode");
            localStorage.removeItem("amount");
            localStorage.removeItem("couponid");
            localStorage.removeItem("coupondesc");
        }
    }

    const OpenBookingFlow = () => {
        setOpen(true);
    }

    useEffect(() => {
        FetchEnquiryDetails();
        FetchCart();
    }, [])
    useEffect(() => {
        if (ItemsinCart) {
            const totalAmount = ItemsinCart.reduce((accumulator, product) => {
                if (accumulator === undefined) {
                    accumulator = product.issue_discounted_price;
                } else {
                    accumulator = parseInt(accumulator) + parseInt(product.issue_discounted_price);
                }
                return accumulator;
            }, undefined)
            setTotalAmount(totalAmount);
        }
    }, [ItemsinCart])

    return (
        <>

            <section className='py-4 sm:py-[8] px-4 sm:px-8'>
                <h1 className=' text-[24px] sm:text-[28px] font-bold'>Price Summary</h1>
                <div className='flex flex-col gap-2' >
                    {!loading && EnquiryDetails.length > 0 && <p className='text_secondary text-[22px] sm:text-[24px] font-[500]'>Model - {EnquiryDetails[0].order_model_segment}</p>}
                    {!loading && <div className=''>
                        {
                            ItemsinCart && ItemsinCart.map((item, index) => (
                                <div key={index} className='flex w-full justify-between items-center text-[18px] sm:text-[20px] my-[5px]' >
                                    <p className='font-bold flex flex-col sm:flex-row gap-[2px] sm:gap-[5px] text-[18px] sm:text-[20px]'> <span>{item.issue_title}</span> <span className='text_secondary font-normal text-[15px] sm:text-[18px]'>(Warranty {item.issue_warranty} . Free {item.issue_repair_type})</span></p>
                                    <div className='flex gap-5 sm:gap-10'>
                                        <p className='text_secondary line-through'>₹{item.issue_display_price}</p>
                                        <p className='font-bold'>₹{item.issue_discounted_price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>}
                    <div>
                        <div className='flex items-center gap-[5px] text_primary  cursor-pointer ' onClick={() => setOpenIssue(true)}>
                            <AddCircleOutlineIcon className='h-[50px] w-[50px]' /><span className='text-[20px] sm:text-[18px] font-[700]'>Add More/Change Issues</span></div>
                    </div>
                    <div>
                        {!CouponApplied &&
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex gap-2'>
                                    <Image src="/assets/images/coupon.svg" width={30} height={30} />
                                    <p className='flex flex-col sm:flex-row text-[18px] sm:text-[24px] font-[700]'><span>3 Offers Available</span><span className='hidden sm:block' > - </span><span className='text-[#048A81]'>Save up to ₹2000</span></p>
                                </div>
                                <Button variant='outlined' className='text_primary cursor-pointer font-[500] text-[16px] sm:text-[18px] w-[120px] h-[50px]' onClick={() => setOpenCoupon(true)}>View all</Button>
                            </div>
                        }
                        {CouponApplied &&
                            <div className='flex justify-between items-center px-[15px] py-[5px] border_faint'>
                                <div>
                                    <p className='text-[18px]'><span className='text_green font-bold'>Fix 300</span>Applied</p>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className='cursor-pointer' onClick={() => RemoveCoupon()}>
                                    <CancelIcon className='w-[50px] h-[50px]' />
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex justify-between items-center mt-[5px]'>
                        <div>
                            <p className='font-bold text-[18px] sm:text-[20px]'>Total Amount*</p>
                            <p className='text_secondary text-[16px]'>Tax & Fees Not Included</p>
                        </div>
                        <div className=''>
                            <p className='font-bold text-[18px] sm:text-[20px] text-right '>₹{TotalAmount}</p>
                            <p className='text_secondary text-[16px] text-right '>Pay After Service</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-end gap-1 mt-5'>
                        {/* <button className='btn_secondary w-[300px]'>Call us On 08047184455</button> */}
                        {/*<p className='text_secondary text-[16px] w-full sm:w-[300px] text-left'>Next available time-slot is 3pm</p>*/}
                        <button className='btn_primary w-full sm:w-[300px]' onClick={() => OpenBookingFlow()}>Place Order</button>
                    </div>
                </div>
                <ConformationDialouge Open={Open} setOpen={setOpen} />
                {!loading && <AddMoreIssue OpenIssue={OpenIssue} setOpenIssue={setOpenIssue} modelDetails={EnquiryDetails.length > 0?EnquiryDetails[0].order_model_segment_id:0} ItemsinCart={ItemsinCart} setItemsinCart={setItemsinCart} />}
                <CouponDialog OpenCoupon={OpenCoupon} setOpenCoupon={setOpenCoupon} TotalAmount={TotalAmount} setTotalAmount={setTotalAmount} setCouponApplied={setCouponApplied} token={token} />
            </section>
        </>
    )
}

export default Hero