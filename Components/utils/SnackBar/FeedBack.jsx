'use client'
import {useEffect,useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const FeedBack = (props) => {
    const {message,Type = 'info'} = props;
    const [open,setopen] = useState(false);
    const handleClose = () =>{
        setopen(false);
    }
    useEffect(() => {
        if (message) {
          setopen(true);
          const timeout = setTimeout(() => {
            setopen(false);
          }, 6000); // Set the duration you want for the snackbar to be visible
          return () =>{
              setopen(false);
            clearTimeout(timeout);
          }
        }
      }, [message]);
  return (
    <div>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose}  severity={Type} className='w-full'>{message}</Alert>
        </Snackbar>

    </div>
  )
}

export default FeedBack