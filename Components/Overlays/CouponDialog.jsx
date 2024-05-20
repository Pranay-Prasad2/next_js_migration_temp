'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent,useTheme,useMediaQuery } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { GET_ALL_COUPONS, VERIFY_COUPON } from '@/app/API/API_Constets';
const CouponDialog = (props) => {
    const { OpenCoupon, setOpenCoupon, TotalAmount,setTotalAmount,setCouponApplied,token } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [CouponList, setCouponList] = useState([]);
    const handleClose = () => {
        setOpenCoupon(false);
    }

    const FetchCoupons = async () => {
        try {
            const response = await fetch(GET_ALL_COUPONS, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Coupons Response Error");
            }
            const responseJson = await response.json();
            if (responseJson.success === false) {
                console.log("Coupon Data error");
                return;
            }
            setCouponList(responseJson.data);
        } catch (error) {
            console.log("Unable to fetch Coupons: ", error);
        }
    }

    const VerifyCoupon = async (id, title, amount, description) => {
        try {
            const url = `${VERIFY_COUPON}${id}&amount=${TotalAmount}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error('Verify coupon response error');
            }
            const responseJson = await response.json();
            if (responseJson.success === true) {
                console.log("Response error Verify Coupon");
                alert(responseJson.message);
                return;
            }
            let new_TotalAmount = parseInt(TotalAmount) - parseInt(amount);
            setTotalAmount(new_TotalAmount);
            setCouponApplied(true);
            if(typeof(window) !== 'undefined'){
                localStorage.setItem("couponcode", title);
                localStorage.setItem("amount", amount);
                localStorage.setItem("couponid", id);
                localStorage.setItem("coupondesc", description);
            }
        } catch (error) {
            console.log("Unable to Verify Coupon: ",error);
        }
    }

    useEffect(() => {
        FetchCoupons();
    }, [])


    return (
        <div>
            <Dialog
                open={OpenCoupon}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                fullScreen={fullScreen}
                className='mt-[30%] sm:mt-0 py-[20px]'
                PaperProps={{
                    sx:{
                        borderRadius:{lg:"15px"},
                        borderTopLeftRadius: {xs:"1.5rem", lg: "15px",md:"15px"},
                        borderTopRightRadius: {xs:"1.5rem", lg: "15px",md:"15px"},
                    }
                }}
            >
                <DialogTitle>
                    <div className='flex justify-end cursor-pointer' onClick={() => handleClose()}><ClearIcon className='w-[30px] h-[30px]' /></div>
                    <div><h2 className='text-center text-[22px] font-bold'>Available Coupons</h2></div>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-[10px]'>
                        {CouponList && CouponList.map((item, index) => (
                            <div key={index} className='flex justify-between items-center w-full border_bottom pb-3'>
                                <div className='flex flex-col gap-[2px]'>
                                    <h3 className='text_green font-bold text-[18px] capitalize '>{item.coupon_title}</h3>
                                    <small className='text_secondary text-[15px]'>{item.coupon_discription}</small>
                                </div>
                                <div className='cursor-pointer'>
                                    <p className='text_green font-bold text-[18px]' onClick={()=>VerifyCoupon(item.coupon_id,item.coupon_title,item.coupon_amount,item.coupon_discription)}>Apply</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CouponDialog