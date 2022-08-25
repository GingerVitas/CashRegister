import React from 'react';
import {Box, Typography} from '@mui/material';

const ReceiptHeader = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:'2-digit',
    minute: '2-digit'
  }
  const date = new Date().toLocaleString('en-US', options) + ''
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100%', margin:'.5rem .5rem 4rem .5rem'}}>
      <Typography variant='h4' sx={{fontWeight:'bold'}}>Roydan Software Solutions</Typography>
      <Typography variant='h6'>Thank you for shopping with us!</Typography>
      <Typography variant='body1'>{date}</Typography>
    </Box>
  )
}

export default ReceiptHeader