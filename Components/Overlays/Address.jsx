'use client'
import { useState, useEffect } from 'react'
import MapsContainer from '@/app/Maps/MapsContainer'
import { TextField } from '@mui/material'
import React from 'react'
import { UPDATE_ADDRESS } from '@/app/API/API_Constets'
import { useRouter } from 'next/navigation'
import { AuthToken } from '@/app/util/functions_helper'
const center = {
  lat: 12.95832793866662,
  lng: 77.61521295603285
}


const Address = (props) => {

  const {setStep,Step} = props;
  const router = useRouter();
  const [token,setToken] = useState('');
  const [Address, setAddress] = useState();
  const [FormatedAddress, setFormatedAddress] = useState();
  const [addressType, setaddressType] = useState(null);
  const [AddressNumber, setAddressNumber] = useState(null);
  const [PostalCode,setPostalCode] = useState();
  const [Landmark, setLandmark] = useState('');
  const addressTypesData = [
    {
      "id": 1,
      "title": "HOME"
    },
    {
      "id": 2,
      "title": "OFFICE"
    },
    {
      "id": 3,
      "title": "OTHER"
    }
  ];
  const generateAddressTypes = () => {
    return addressTypesData.map((selectedAddressType, index) => (
      <button
        key={index}
        value={selectedAddressType.id}
        onClick={(e) => { e.preventDefault() ; setaddressType(selectedAddressType.id)}}
        className={`${addressType === selectedAddressType.id ? 'contained_btn' : 'outlined_btn'}`}
        style={{
          padding: "0.3rem 1.5rem",
        }}
      >
        {selectedAddressType.title}
      </button>
    ));
  };
  const AddressTypeComponent = generateAddressTypes();

  const mid = (FormatedAddress)?Math.round(FormatedAddress.length / 2):0;
  const addressOne = FormatedAddress?FormatedAddress.slice(0,mid):0;
  const handleChange = async (e) => {
    try {
      const { long_name: postalCode = "" } =
        Address.address_components.find((c) =>
          c.types.includes("postal_code")
        ) || {};
      const lng = Address.geometry.location.lng;
      const lat = Address.geometry.location.lat;
      const response = await fetch(UPDATE_ADDRESS, {
        method: 'POST',
        body: JSON.stringify({
          addressType: addressType,
          addressNo: AddressNumber,
          addressOne: addressOne,
          pincode: PostalCode,
          longitude: lng,
          latitude: lat,
          addressFull: FormatedAddress
        }),
        headers: {
          Authorization: "Bearer " + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if(!response.ok){
        throw new Error("Address response error");
      }
      const responseJson = await response.json();
      if(responseJson.success === false){
        console.log("Address Response False");
        return;
      }
      if(typeof(window) !== 'undefined'){
        console.log(responseJson.data);
        localStorage.setItem('addressId',responseJson.data);
      }
      router.push('/conform-order');
    } catch (error) {
      console.log("Unable to Add Address",error);
    }
  }
  useEffect(() => {
    setToken(AuthToken());
    if (typeof (window) !== 'undefined') {
      const address = JSON.parse(localStorage.getItem('address'));
      const PincodeId = localStorage.getItem('pincodeId');
      setPostalCode(PincodeId);
      setAddress(address);
      setFormatedAddress(address.formatted_address);
    }
  }, [])
  return (
    <div className='flex flex-col gap-[10px]'>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-[2rem] py-[2rem]'>
        <div className='flex flex-col  gap-[20px]'>
          <div className='flex items-center jsutify-between w-full gap-[8px]'>
            <p className='font-semibold text-[16px]'>{addressOne}</p>
            <p className='text_primary underline cursor-pointer font-bold' onClick={()=>setStep(1)}>Change</p>
          </div>
          <div className='flex flex-col justify-between h-[100%] min-h-[300px]'>
            {/* <Mapstext/> */}
            <TextField label='House/Flat number' fullWidth onChange={(e) => setAddressNumber(e.target.value)} required />
            <TextField label='Landmark (Optional)' onChange={(e) => setLandmark(e.target.value)} fullWidth />
            <TextField label="Name" focused value="Pranay" fullWidth />
            <div className='flex justify-between items-center'>
              {AddressTypeComponent}
            </div>
          </div>
        </div>
        <div className='hidden sm:block'>
          <MapsContainer center={center} />
        </div>
      </div>
      <div className='flex justify-center'>
        <button onClick={()=>handleChange()} disabled={!addressType&&!AddressNumber} className={`${addressType && AddressNumber?'bg_primary':'bg_grey'} px-8 py-5 rounded-[5px] text-white font-bold w-full sm:w-[250px]`}>Conform & Proceed</button>
      </div>
    </div >
  )
}

export default Address