'use client'

import MapsContainer from '@/app/Maps/MapsContainer'
import NewAddresstext from '@/app/Maps/NewAddressText';
import { useEffect, useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { CHECKPINCODE, GOOGLE_MAPS_API_KEY } from '@/app/API/API_Constets';
import { AuthToken } from '@/app/util/functions_helper';
import { Typography } from '@mui/material';
const mapContainerStyle = {
    width: '100%',
    height: '300px',
}
const NewAddress = (props) => { //Main Body

    const [PostalCode,setPostalCode] = useState();
    const [Address,setAddress] = useState();
    const [token,setToken] = useState();
    const {step,setStep} = props
    const [ShowAlert,setShowAlert] = useState(false);
    const handleChange = async() => {
        try {
            const { long_name: postalCode = "" } =
            Address.address_components.find((c) =>
              c.types.includes("postal_code")
            ) || {};
            setPostalCode(postalCode);
            const response = await fetch(`${CHECKPINCODE}?pincode=${postalCode}`,{
                method:'GET',
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            if(!response.ok){
                throw new Error("Pincode response Error");
            }
            const responseJson = await response.json();
            if(responseJson.success === false){
                setShowAlert(true);
                return;
            }
            if(typeof(window) !== 'undefined'){
                console.log(responseJson.data);
                localStorage.setItem('pincodeId',responseJson.data[0].loc_pincode_id);
            }
            setShowAlert(false);
            if(step === 3){
                setStep(step-1);
            }
            else{
                setStep(step+1);
            }
        } catch (error) {
            throw new Error('unable to verufy pincode');
        }   
    }
    const [CurrentLocation, setCurrentLocation] = useState();
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // setLocation({ latitude, longitude });
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
                    try {
                        fetch(apiUrl)
                            .then((response) => response.json())
                            .then((data) => {
                                const address = data.results[0];
                                if (typeof (window) !== 'undefined') {
                                    localStorage.setItem('address', JSON.stringify(address));
                                    localStorage.setItem('addressId',null);
                                }
                                setAddress(address);

                                setCurrentLocation(address.formatted_address);
                                // PushLocationData(data.results[0]);
                                // setLocation((prevLocation) => ({ ...prevLocation, address }));
                            })
                            .catch((error) => console.log('Error fetching address:', error))


                    } catch (error) {
                        console.log("Unable to get address", error);
                    }
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                }
            )
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }
    useEffect(()=>{
        setToken(AuthToken());
    },[])
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className='py-[2rem]'>
                <div className='w-[100%] sm:w-[50%] mx-auto flex flex-col gap-[5px]'>
                    <NewAddresstext CurrentLocation={CurrentLocation} setAddress={setAddress} />
                    <p className='text-center text_secondary'>
                        - Or -
                    </p>
                    <div className='flex justify-center items-center gap-[3px]'>
                        <MyLocationIcon />
                        <p className='cursor-pointer text-center font-bold' onClick={() => getCurrentLocation()}>Use Current Location</p>
                    </div>
                </div>
                <div className='mt-[2rem]'>
                    <MapsContainer mapContainerStyle={mapContainerStyle} />
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                    {ShowAlert&&<small className='text_danger text-[14px] text-center font-bold'>Service Unavailable</small>}
                <button disabled={!Address} className={`${Address?'bg_primary':'bg_grey'} px-8 py-5 rounded-[5px] text-white font-bold w-full sm:w-[250px]`} onClick={() => handleChange()} >Conform & Proceed</button>
            </div>
        </div>
    )
}

export default NewAddress