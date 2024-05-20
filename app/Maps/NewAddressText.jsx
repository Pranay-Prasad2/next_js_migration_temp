'use client'
import { useState, useRef,useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api"
import { GOOGLE_MAPS_API_KEY } from "../API/API_Constets";
import { TextField } from "@mui/material";
import FeedBack from "@/Components/utils/SnackBar/FeedBack";
const NewAddresstext = (props) => {
    const {CurrentLocation,setAddress} = props;

    const [autocomplete, setAutocomplete] = useState(null);
    const [Feedbackmsg, setFeedbackmsg] = useState('');
    const mapRef = useRef(null);
    const [Location,setLocation] = useState(CurrentLocation);
    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            // console.log(place.);
            setLocation(place.formatted_address)
            setAddress(place);
            if(typeof(window) !== 'undefined'){
                localStorage.setItem('address',JSON.stringify(place));
            }
            if (place.geometry && place.geometry.location && mapRef.current) {
                setAutocomplete(null);
            }
        }
    };
    useEffect(()=>{
        setLocation(CurrentLocation);
        console.log(CurrentLocation);
    },[CurrentLocation])

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
                        onChange={(e)=>setLocation(e.target.value)}
                        value={Location}
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

export default NewAddresstext