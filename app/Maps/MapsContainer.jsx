'use client'
import { useCallback, useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api"
import { GOOGLE_MAPS_API_KEY } from "../API/API_Constets";
import { TextField } from "@mui/material";
const mpcenter = {
    lat: 12.95832793866662,
    lng: 77.61521295603285
  }
const MapsContainer = ({ mapContainerStyle = {
    width: '100%',
    height: '400px',
}, center = mpcenter, zoom = 20 }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const [markerPosition, setMarkerPosition] = useState(null);
    const mapRef = useRef(null);

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            console.log('Selected place: ', place);

            if (place.geometry && place.geometry.location && mapRef.current) {
                // Set the Autocomplete value to an empty string to clear the input
                setAutocomplete(null);

                // Update the map's center state
                setMapCenter({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
                setMarkerPosition({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
            }
        }
    };
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <GoogleMap
                ref={(map) => (mapRef.current = map)}
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={20}
                options={{
                    disableDefaultUI: true, // Disables all default UI controls
                    fullscreenControl: false, // Disables the full-screen control
                    streetViewControl: false, // Disables the Pegman (Street View control)
                    mapTypeControl: false, // Disables the satellite switch
                    // Other map options...
                }}
            >
                {/* <Autocomplete
                    onLoad={(auto) => setAutocomplete(auto)}
                    onPlaceChanged={handlePlaceSelect}
                >
                    <TextField
                        type="text"
                        placeholder="Search for a place"
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transperent',
                            width: '240px',
                            height: '32px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-120px',
                        }}
                    />
                </Autocomplete> */}
                {markerPosition && (
                    <Marker position={center} title="Selected Place" />
                )}

            </GoogleMap>
        </LoadScript>
    )
}

export default MapsContainer