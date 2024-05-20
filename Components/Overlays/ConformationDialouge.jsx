'use client'
import { useState } from 'react'

import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, Step, useMediaQuery, useTheme,Stepper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DateTime from './DateTime';
import Address from './Address';
import SelectAddress from './SelectAddress';
import NewAddress from './NewAddress';
import { useRouter } from 'next/navigation'
import { GetUserAddress } from '@/app/util/functions_helper';
const ConformationDialouge = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const router = useRouter();
    const { Open, setOpen } = props;

    const [UserAddress, setUserAddress] = useState([]);

    const handleClose = () => {
        setOpen(false);
    } 
    const steps = ['Date&Time','Address'];

    const [step, setStep] = useState(0);
    const GetFunctionToRender = () => {
        switch (step) {
            case 0:
                return <DateTime setStep={setStep} step={step} />
            case 1:
                return <>
                    {UserAddress.length <= 0 ?
                        <NewAddress setStep={setStep} step={step} />
                        :
                        <SelectAddress UserAddress={UserAddress} setStep={setStep} step={step} />}
                </>
            case 2:
                return <Address setStep={setStep} step={step} />
            case 3:
                return <NewAddress setStep={setStep} step={step} />
            default:
                return null;
        }
    }

    const Next_Page = () => {
        router.push('/conform-order');
    }
    const handleConform = () => {
        if (step === 0 && UserAddress.length <= 0) {
            setStep(2)
            console.log("Step>>2");
        }
        else if (step === 1) {
            setStep(3)
            console.log("Step>>3");
        }
        else if (step === 3) {
            Next_Page();
            console.log("Step>>next page");
        }
        else {
            setStep(step + 1);
            console.log(step + 1)
        };
    }

    const componentToRender = GetFunctionToRender();

    useState(() => {
        const getUserAddress = async () => {
            const response = await GetUserAddress();
            setUserAddress(response);
        }
        getUserAddress();
    }, [])
    return (
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={Open}
            onClose={handleClose}
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: { lg: "15px" },
                    borderTopLeftRadius: { xs: "1.5rem", lg: "15px", md: "15px" },
                    borderTopRightRadius: { xs: "1.5rem", lg: "15px", md: "15px" },
                }
            }}
            className='mt-[20%] sm:mt-0 py-[20px] mb-[-15px]'
            scroll="paper"
            style={{ zIndex: 999 }}
        >
            <DialogTitle className='text-center font-bold text-[18px]'>
                <h2 className='text-[20px] font-bold'>Checkout</h2>
                {/* <button onClick={() => handleClose()} >Close</button> */}
            </DialogTitle>
            <DialogContent>
                <div className='text-center'>
                    {/* <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit">
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper> */}
                </div>
                <div>
                    {componentToRender}
                </div>
                {/* <div className='flex justify-center'>
                    <button className='bg_primary px-8 py-5 rounded-[5px] text-white font-bold' onClick={() => handleConform()} >Conform & Proceed</button>
                </div> */}
            </DialogContent>
        </Dialog>
    )
}

export default ConformationDialouge