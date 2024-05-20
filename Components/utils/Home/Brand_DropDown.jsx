'use client'
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';

import { fetchDropDown } from '@/app/util/functions_helper';
import { GET_MODELS_BY_CATEGORY } from "@/app/API/API_Constets";


const Brand_DropDown = (props) => {
    const {setDropDownStep,DropDownStep,devicedetails,setmodeldetails} = props;
    const [ModelList, setModelList] = useState([]);

    const setModelInfo = (modelName, modelId) => {
      const modelInfo = {
        model_name: modelName,
        model_id: modelId
      }
      setmodeldetails(modelInfo);
      setDropDownStep(DropDownStep+1);
  }

    useEffect(() => {
        const getDeviceList = async()=>{
            let url = GET_MODELS_BY_CATEGORY+parseInt(devicedetails.device_id)+'&brand='+parseInt(devicedetails.brand_id);
            const response = await fetchDropDown(url);
            setModelList(response || []);
        }
        getDeviceList();
    }, [])
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Brand</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Device"
                    open
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300
                        }
                      }
                    }}
                >
                    {ModelList && Array.isArray(ModelList) && ModelList.map((item,index)=>(
                        <MenuItem key={index} value={item} onClick={()=>{setModelInfo(item.model_title, item.model_id)}}>{item.model_title}</MenuItem>
                    ))}
                    {!ModelList && !Array.isArray(ModelList) &&< MenuItem disabled> No data </MenuItem>}
                </Select>
            </FormControl>
        </Box>
    )
}

export default Brand_DropDown