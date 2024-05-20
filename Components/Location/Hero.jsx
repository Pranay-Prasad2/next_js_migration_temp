'use client'
import { useEffect, useState } from 'react'
import { GOOGLE_MAPS_API_KEY } from '@/app/API/API_Constets'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Mapstext from '@/app/Maps/Mapstext'
import { FetchEnquiryDetails,AuthToken,FetchUserProfile } from '@/app/util/functions_helper';
import { ENQUIRY_GT } from '@/app/API/API_Constets';
import FeedBack from '../utils/SnackBar/FeedBack';
import { useRouter } from 'next/navigation';
const Hero = () => {
    const router = useRouter();
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: null,
    })
    const [EnquiryDetails, setEnquiryDetails] = useState([]);
    const [UserProfile,setUserProfile] = useState([]);
    const [Token, setToken] = useState('');
    const [Feedbackmsg, setFeedbackmsg] = useState('');
    const PushLocationData = async (place) => {
        try {
            const { long_name: postalCode = "" } =
                place.address_components.find((c) =>
                    c.types.includes("postal_code")
                ) || {};
            const data = {
                enquiryId: EnquiryDetails ? EnquiryDetails[0].order_id : 0,
                addressFull: place.formatted_address,
                addressArea: '0',
                pincode: postalCode,
                longitude: place.geometry.location.lng,
                latitude: place.geometry.location.lat,
                gtpInternal: false,
                pincodeId: 0,
                areaId: 0
            };
            const response = await fetch(ENQUIRY_GT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseJson = await response.json();

            if (responseJson.success === false) {
                setFeedbackmsg('Response Error');
            } else {
                console.log("Success:", responseJson);
                router.push('/conformation');
            }
        } catch (error) {
            setFeedbackmsg('Failed to generate enquiry');
            console.log(error);
        }
    }
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
                    try {
                        fetch(apiUrl)
                            .then((response) => response.json())
                            .then((data) => {
                                const address = data.results[0].formatted_address;
                                PushLocationData(data.results[0]);
                                setLocation((prevLocation) => ({ ...prevLocation, address }));
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

    useEffect(() => {
        const getToken = async() =>{
            const token = AuthToken();
            setToken(token);
        }
        const getEnquiryDetails = async () => {
            const response = await FetchEnquiryDetails();
            setEnquiryDetails(response);
        }
        const getUserProfile = async() => {
            const response = await FetchUserProfile();
            setUserProfile(response);
        }
        getToken();
        getEnquiryDetails();
        getUserProfile();
    }, [])
    return (
        <section className="py-8 px-4 sm:px-8">
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div className={`flex flex-col p-4 px-3 sm:px-8 gap-[20px] border_right`}>
                    <div>
                        <h1 className='text-[24px] sm:text-[40px] font-bold'>Where are you located?</h1>
                        <p className='text_secondary text-[18px] '>Nearest professional will come to your home, work, or anywhere else and fix your device at doorstep.</p>
                    </div>
                    <div>
                        <Mapstext />
                    </div>
                    <div className='flex justify-center items-center gap-[3px]'>
                        <MyLocationIcon />
                        <p className='cursor-pointer text-center font-bold' onClick={() => getCurrentLocation()}>Use Current Location</p>
                    </div>
                </div>
                <div className='p-4 px-3 sm:px-8'>
                    <div className='flex justify-between items-end'>
                        <h1 className='text-[24px] sm:text-[40px] font-bold ' >Summary</h1>
                        <p className='text_primary underline text-[18px] cursor-pointer'>Change</p>
                    </div>
                    <br/>
                    <div>
                        {UserProfile.length > 0 && Array.isArray(UserProfile)? <div className='py-5 px-2'>
                            <h2 className='text_secondary text-[18px] font-semibold'>Contact Details</h2>
                            <p className='text-[20px] capitalize '>{UserProfile[0].user_fullname}</p>
                            <p className='text_secondary text-[18px] font-medium'>{UserProfile[0].user_mobile}</p>
                        </div>:<></>}
                        <hr />
                        { EnquiryDetails.length > 0 && Array.isArray(EnquiryDetails)? <div className='py-5 px-2'>
                            <h2 className='text_secondary text-[18px] font-semibold'>Model & Issue</h2>
                            <p className='text-[20px] capitalize'>{EnquiryDetails[0].order_model_segment}</p>
                            <p className='text_secondary text-[18px] font-medium'>{EnquiryDetails[0].order_issues[0].issue_name}</p>
                        </div>:<></>}
                    </div>
                </div>
            </div>
            <FeedBack  message={Feedbackmsg} />
        </section>
    )
}

export default Hero