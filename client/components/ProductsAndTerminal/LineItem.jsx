import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LineItem = ({idx, productName, productPrice, quantity, cashOpen, taxRate, setCurrentOrder, currentOrder}) => {

  const subtotal = productPrice ? (productPrice * quantity).toFixed(2) : null
  const handleClick = () => {
    setCurrentOrder({...currentOrder, lineItems: currentOrder.lineItems.filter(item => currentOrder.lineItems.indexOf(item) !== idx)})
  }

  return (
    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
      {!cashOpen ? <IconButton aria-label='Delete' onClick={handleClick} sx={{width:'5%'}}>
        <DeleteForeverIcon />
      </IconButton> : <hr/>}
      <Typography sx={{width:'55%'}}>{productName}</Typography>
      <Typography sx={{width:'15%'}}>Qty: {quantity}</Typography>
      <Typography variant='caption' sx={{width:'15%', textAlign:'right'}}>{taxRate === 0 ? 'Tax Exempt' : null}</Typography>
      <Typography sx={{width:'10%', textAlign:'right', marginRight:'5px'}}>${subtotal}</Typography>
    </Box>
  )
};

export default LineItem