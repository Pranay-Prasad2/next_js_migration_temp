'use client'
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';

import { fetchDropDown } from '@/app/util/functions_helper';
import { GET_HERO_DEVICE_LIST } from "@/app/API/API_Constets";


const Device_DropDown = (props) => {
    const {setDropDownStep,DropDownStep, setdevicedetails} = props;
    const [DeviceList, setDeviceList] = useState([]);


    const setDeviceInfo = (itemName,itemCategoryId,itemBrandId) => {
        const deviceInfo = {
            device_name:itemName,
            device_id: itemCategoryId,
            brand_id: itemBrandId
          };
        setdevicedetails(deviceInfo);
        setDropDownStep(DropDownStep+1);
    }

    useEffect(() => {
        const getDeviceList = async()=>{
            const deviceListData = await fetchDropDown(GET_HERO_DEVICE_LIST);
            setDeviceList(deviceListData || []);
        }
        getDeviceList();
    }, [])
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Device</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Device"
                >
                    {DeviceList && Array.isArray(DeviceList) && DeviceList.map((item,index)=>(
                        <MenuItem key={index}    value={item} onClick={()=>{setDeviceInfo(item.itemName,item.itemCategoryId,item.itemBrandId)}}>{item.itemName}</MenuItem>
                        ))}
                    {!DeviceList && !Array.isArray(DeviceList) && <MenuItem disabled >NO DATA</MenuItem>}
                </Select>
            </FormControl>
        </Box>  
    )
}

export default Device_DropDown