'use client'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';

import { fetchDropDown } from '@/app/util/functions_helper';
import { GET_ISSUES_GADGETS } from "@/app/API/API_Constets";


const Issue_DropDown = (props) => {
    const { modeldetails, setissuedetails } = props;
    const [IssuesList, setIssuesList] = useState([]);
    const [Open, setOpen] = useState(true);

    const setIssueInfo = (IssueName,IssueId) => {
        const IssueDetails = {
            issue_name: IssueName,
            issue_id: IssueId
        };
        setissuedetails(IssueDetails);
    }

    useEffect(() => {
        const getDeviceList = async () => {
            let url = GET_ISSUES_GADGETS + modeldetails.model_id + '';
            const response = await fetchDropDown(url);
            setIssuesList(response || []);
        }
        getDeviceList();
    }, [])
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Issue</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Issues"
                    open={Open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 300
                            }
                        }
                    }}
                >
                    {IssuesList && Array.isArray(IssuesList) && IssuesList.map((item, index) => (
                        <MenuItem key={index} value={item} onClick={()=>setIssueInfo(item.issue_title,item.issue_id)}>{item.issue_title}</MenuItem>
                    ))}
                    { !IssuesList && !Array.isArray(IssuesList) && <MenuItem disabled>No Data</MenuItem>}
                </Select>
            </FormControl>
        </Box>
    )
}

export default Issue_DropDown