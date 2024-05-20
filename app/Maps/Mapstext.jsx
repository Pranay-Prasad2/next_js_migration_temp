'use client'
import { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api"
import { GOOGLE_MAPS_API_KEY } from "../API/API_Constets";
import { TextField } from "@mui/material";
import { AuthToken, FetchEnquiryDetails } from "../util/functions_helper";
import FeedBack from "@/Components/utils/SnackBar/FeedBack";
import { ENQUIRY_GT } from "../API/API_Constets";
import { useRouter } from "next/navigation";
const Mapstext = () => {

    const router = useRouter();

    const [autocomplete, setAutocomplete] = useState(null);
    const [EnquiryDetails, setEnquiryDetails] = useState(null);
    const [Token, setToken] = useState('');
    const [Feedbackmsg, setFeedbackmsg] = useState('');
    const mapRef = useRef(null);
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
                longitude: place.geometry.location.lng(),
                latitude: place.geometry.location.lat(),
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
                //   navigate("/temp_conform");
                router.push('/conformation');
            }
        } catch (error) {
            setFeedbackmsg('Failed to generate enquiry');
            console.log(error);
        }
    }

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            console.log(place);
            PushLocationData(place);

            if (place.geometry && place.geometry.location && mapRef.current) {
                setAutocomplete(null);
            }
        }
    };
    useEffect(() => {
        const getToken = async() =>{
            const token = AuthToken();
            setToken(token);
        }
        const getEnquiryDetails = async () => {
            const response = await FetchEnquiryDetails();
            setEnquiryDetails(response);
        }
        getToken();
        getEnquiryDetails();
    }, [])
    
    return (
        <>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
                <Autocomplete
                    onLoad={(auto) => setAutocomplete(auto)}
                    onPlaceChanged={handlePlaceSelect}
                    style={{ zIndex: 2000 }}
                >
                    <TextField
                        type="text"
                        placeholder="Search for a place"
                        focused
                        style={{
                            border: '1px solid transperent',
                            width: "100%",
                            // padding: '0 12px',
                            borderRadius: '3px',
                            // boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                        }}
                        inputProps={{
                            style: { zIndex: 999 }
                        }}
                    />
                </Autocomplete>
            </LoadScript>
            <FeedBack messsage={Feedbackmsg} />
        </>
    )
}

export default Mapstext