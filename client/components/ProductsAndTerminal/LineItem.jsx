import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LineItem = ({idx, productName, productPrice, quantity, taxRate, setCurrentOrder, currentOrder}) => {

  const subtotal = (productPrice * quantity * (1+taxRate)).toFixed(2)
  const handleClick = () => {
    setCurrentOrder({...currentOrder, lineItems: currentOrder.lineItems.filter(item => currentOrder.lineItems.indexOf(item) !== idx)})
  }

  return (
    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
      <IconButton aria-label='Delete' onClick={handleClick} sx={{width:'5%'}}>
        <DeleteForeverIcon />
      </IconButton>
      <Typography sx={{width:'65%'}}>{productName}</Typography>
      <Typography sx={{width:'15%'}}>Qty: {quantity}</Typography>
      <Typography sx={{width:'15%', textAlign:'right', marginRight:'5px'}}>Subtotal: ${subtotal}</Typography>
    </Box>
  )
};

export default LineItem