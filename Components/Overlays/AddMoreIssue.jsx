'use client'

import { useState, useEffect } from 'react'
import {
    Dialog, DialogContent, DialogTitle, useMediaQuery,
    useTheme,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { GET_ISSUES_MODEL,UPDATE_CART } from '@/app/API/API_Constets';
import { fetchDropDown } from '@/app/util/functions_helper';
const AddMoreIssue = (props) => {
    const { OpenIssue, setOpenIssue, modelDetails, ItemsinCart,setItemsinCart } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const cookies = document.cookie;
    const tokenMatch = cookies.match(/token=([^;]*)/);
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
    const [IssueList, setIssueList] = useState([]);
    const handleClose = () => {
        setOpenIssue(false);
    }

    const checkItemInCart = (id) => {

        if (ItemsinCart) {
            let item = ItemsinCart.find((i) => i.issue_id === id);
            if (item)
                return true;
        }
        return false;
    };

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

    const CartUpdateCheck = async (issue_id,method) => {
        var CartLength = ItemsinCart.length;
        if(CartLength < 2 && method === 1){  // Method === 1 : Remove item
            alert("Cart Cannot be empty POP");
            return;
        }
        UpdateCart(issue_id);
    }
    const UpdateCart = async(issue_id) => {
        try {
            const payload = new FormData();
            payload.append("issueId", issue_id);
            const response = await fetch(UPDATE_CART,{
                method:'POST',
                body: JSON.stringify({
                    issueId:issue_id
                }),
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            if(!response.ok){
                throw new Error("Update Cart Response Error");
            }
            FetchCart();

        } catch (error) {
            console.log("Error",error);
            // throw new Error("Unable to update Cart",error);
        }
    }

    const GetAllIssues = async () => {
        let url = GET_ISSUES_MODEL + modelDetails + '';
        const response = await fetchDropDown(url);
        setIssueList(response || []);
    }
    useEffect(() => {
        GetAllIssues();
        // FetchCart(setItemsinCart);
    }, [])

    return (
        <div>
            <Dialog
                open={OpenIssue}
                onClose={handleClose}
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
                <DialogTitle className='flex justify-between items-center'>
                    <h2 className='font-bold text-[22px] sm:text-[24px]'>Add More Issue</h2>
                    <p className='cursor-pointer' onClick={() => handleClose()}><ClearIcon className='w-[50px] h-[50px]' /></p>
                </DialogTitle>
                <DialogContent>
                    <div>
                        {IssueList && IssueList.map((item, index) => (

                            <div key={index} className='flex justify-between gap-[1rem] sm:gap-[2rem] px-[5px] sm:px-3 py-3 border_bottom'>
                                <div className='w-[700px] sm:w-[600px] flex flex-col gap-[5px] ' >
                                    <div className='grid grid-cols-[60%_30%] gap-[20px]'>
                                        <p className=' text-[15px] sm:text-[20px] font-bold'>{item.issue_title}</p>
                                        <p className='text-[16px] sm:text-[20px] font-bold '>₹{item.discounted_price}</p>
                                    </div>
                                    <div>
                                        <p className='text-[14px] sm:text-[16px] text_secondary'>{item.warranty_period} Warranty . Free {item.repair_type}</p>
                                    </div>
                                </div>
                                <div>
                                    {!checkItemInCart(item.issue_id) ?
                                        <button className='px-[2rem] sm:px-[3rem] py-[1rem] issue_btn class_success' onClick={()=>CartUpdateCheck(item.issue_id,0)}>Add</button>
                                         :
                                        <button className='px-[1.1rem] sm:px-[2rem] py-[1rem] issue_btn class_danger' onClick={()=>CartUpdateCheck(item.issue_id,1)}>Remove</button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddMoreIssue