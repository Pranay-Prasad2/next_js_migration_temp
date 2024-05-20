'use client'
import { useEffect, useState } from 'react'
import { GET_ENQUIRY_DETAILS, UPDATE_CART, UPDATE_ENQUIRY, CREATE_ORDER } from '@/app/API/API_Constets'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Moment from 'moment';
import { useRouter } from 'next/navigation';
import ConformationDialouge from '../Overlays/ConformationDialouge';
const Hero = () => {
    const router = useRouter();
    const [EnquiryDetails, setEnquiryDetails] = useState([]);
    const [ItemsinCart, setItemsinCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [TotalAmount, setTotalAmount] = useState();

    const [Open,setOpen] = useState(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [timeId, setTimeId] = useState(null);
    const [month, setMonth] = useState(null);
    const [couponAmount, setCouponAmount] = useState(0);
    const [couponCode, setCouponCode] = useState(null);
    const [Address,setAddress] = useState(null);
    const [AddressId,setAddressId] = useState();

    const cookies = typeof document !== 'undefined' ? document.cookie : null;
    const tokenMatch = cookies ? cookies.match(/token=([^;]*)/) : null;
    const enquiry_id_Match = cookies ? cookies.match(/enquiry_id_encrypted=([^;]*)/) : null;
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
    const enquiry_id_encrypted = enquiry_id_Match ? decodeURIComponent(enquiry_id_Match[1]) : null;

    // const date = localStorage.getItem("displayDate");
    // const time = localStorage.getItem("selectedTime");
    // const timeId = localStorage.getItem("selectedTimeId");
    // const month = localStorage.getItem("displayMonth");
    // const couponAmount = localStorage.getItem("amount") === null ? 0 : localStorage.getItem("amount");
    // const CouponCode = localStorage.getItem("couponcode");
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

    const ClearCart = async () => {
        try {
            const response = await fetch(UPDATE_CART, {
                method: 'PUT',
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Clear Cart Response Error");
            }
            const responseJson = await response.json();
            if (responseJson.success === false) {
                alert("Unable to Clear Cart");
                return;
            }

        } catch (error) {
            console.log("Unable to Clear Cart", error);
        }
    }

    const CreateOrder = async () => {
        try {
            let selectedDate = localStorage.getItem("selecteddate");
            let coupon_id = localStorage.getItem("couponid");
            let selectedAddress = 116;
            if (coupon_id === null || coupon_id === undefined) {
                coupon_id = 0;
            }
            const paymentType = 1;
            const response = await fetch(CREATE_ORDER, {
                method: "POST",
                body: JSON.stringify({
                    enquiryId: EnquiryDetails[0].order_id,
                    addressId: AddressId,
                    // dateOrder: Moment(selectedDate).format('DD/MM/YYYY'),
                    dateOrder: Moment(selectedDate).format('YYYY-MM-DD'),
                    timeslot: timeId,
                    paymentType: paymentType,
                    coupon: coupon_id,
                }), //post body
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Response Error Create Order");
            }
            ClearCart();
            const responseJson = await response.json();
            if (responseJson.success === false) {
                alert("Error Create Order: ", responseJson.message);
                return;
            }
            localStorage.removeItem('selecteddate');
            localStorage.removeItem('displayDate');
            localStorage.removeItem('displayMonth');
            localStorage.removeItem('selectedTime');
            localStorage.removeItem('selectedTimeId');
            router.push('/thankyou');

        } catch (error) {
            console.log("Unable to Create Order: ", error);
        }
    }


    const UpdateEnquiry = async () => {
        try {
            const newIssue = ItemsinCart.map((item, index) => (item.issue_id));
            console.log("new Issue", newIssue);
            const response = await fetch(UPDATE_ENQUIRY, {
                method: "POST",
                body: JSON.stringify({
                    city: 1,
                    enquiry: EnquiryDetails[0].order_id,
                    issues: newIssue,

                }), //post body
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Response error Update Enquiry");
            }
            const responseJson = await response.json();
            if (responseJson.success === false) {
                // Pop up for error
                console.log("Json Response Error Update Cart")
            }
            console.log("Enquiry Updates");
            CreateOrder(); // Create Order if Updated
        } catch (error) {
            throw new Error("Unable to Update Cart", error);
        }
    };


    useEffect(() => {
        FetchEnquiryDetails();
        FetchCart();

        if (typeof window !== 'undefined') {
            const storedDate = localStorage.getItem("displayDate");
            const storedTime = localStorage.getItem("selectedTime");
            const storedTimeId = localStorage.getItem("selectedTimeId");
            const storedMonth = localStorage.getItem("displayMonth");
            const storedCouponAmount = localStorage.getItem("amount") === null ? 0 : localStorage.getItem("amount");
            const storedCouponCode = localStorage.getItem("couponcode");
            const address = JSON.parse(localStorage.getItem('address'));
            const addressId = localStorage.getItem('addressId');
            const FormatedAddress = address.formatted_address;
            const mid = (FormatedAddress)?Math.round(FormatedAddress.length / 3):0;
            const mid2 = (FormatedAddress)?Math.round(FormatedAddress.length / 3):0;
            const addressOne = FormatedAddress?FormatedAddress.slice(0,mid):0;
            const addresstwo = FormatedAddress?FormatedAddress.slice(0,mid2):0;
            
            // Update state with the retrieved values
            setAddressId(addressId);
            setDate(storedDate);
            setAddress(addressOne)
            setTime(storedTime);
            setTimeId(storedTimeId);
            setMonth(storedMonth);
            setCouponAmount(storedCouponAmount);
            setCouponCode(storedCouponCode);
           
          }
    }, [])
    useEffect(() => {
        if (ItemsinCart) {
            let totalAmount = ItemsinCart.reduce((accumulator, product) => {
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
    }, [ItemsinCart])

    return (
        <section className='py-8 px-4 sm:px-8'>
            <div>
                <h1 className=' text-[24px] sm:text-[28px] font-bold'>Price Summary</h1>
                <div className='flex flex-col gap-2' >
                    {/* {!loading && <p className='text_secondary text-[24px] font-[400]'>Model</p>} */}
                    {!loading && <p className='text_secondary text-[24px] font-[400]'>Model - {EnquiryDetails[0].order_model_segment}</p>}
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
                    {couponCode && <div className='flex w-full justify-between items-center text-[18px] sm:text-[20px]'>
                        <p className='text_green font-bold'>Coupons ({couponCode})</p>
                        <p className='text_danger' >- ₹{couponAmount}</p>
                    </div>}
                    <div className='flex w-full justify-between items-center text-[18px] sm:text-[20px]'>
                        <p>Tax & Fees</p>
                        <p>₹49</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='font-normal sm:font-bold text-[18px] sm:text-[20px]'>Total Amount*</p>
                            <p className='text_secondary text-[16px]'>Amount is not inclusive of taxes</p>
                        </div>
                        <div className=''>
                            <p className='font-bold text-[18px] sm:text-[20px] text-right '>₹{TotalAmount}</p>
                            <p className='text_secondary text-[16px] text-right '>No payment until the service is done</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='mt-[15px] mb-[10px]'>
                <h1 className=' text-[24px] sm:text-[28px] font-bold'>Booking Details</h1>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-center items-center gap-[15px]'>
                            <p className='text-[18px] flex items-center'> <CalendarTodayIcon className='m-[5px]' />{date} {month}</p>
                            <p className='text-[18px] flex items-center'><AccessTimeIcon className='m-[5px]' />{time}</p>
                        </div>
                        <div className='cursor-pointer' onClick={()=>setOpen(true)}><ModeEditIcon /></div>
                    </div>
                    <div className='flex justify-between items-center gap-[5px]'>
                        <p className='text-[16px] flex items-center lowercase'> <PlaceIcon className='m-[5px]' /> {Address}</p>
                        <div className='cursor-pointer' onClick={()=>setOpen(true)}><ModeEditIcon /></div>
                    </div>
                    <div className='text-[20px] flex items-center '>
                        <input type="checkbox" className='h-[22px] w-[22px] m-[5px]' checked />
                        Agree Terms&conditions</div>
                </div>
                <div>
                    <div className='flex flex-col items-end gap-1 mt-5'>
                        {/* <button className='btn_secondary w-[300px]'>Call us On 08047184455</button> */}
                        {/* <p className='text_secondary text-[16px] w-full sm:w-[300px] text-left'>Next available time-slot is 3pm</p> */}
                        <button className='btn_primary w-full sm:w-[300px]' onClick={() => UpdateEnquiry()}>Place Order</button>
                    </div>
                </div>
            </div>
            <ConformationDialouge Open={Open} setOpen={setOpen}/>
        </section>
    )
}

export default Hero