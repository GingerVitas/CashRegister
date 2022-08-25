import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {Delete} from '@mui/icons-material';

const LineItem = ({idx, productName, productPrice, changeOpen, quantity, cashOpen, taxRate, setCurrentOrder, currentOrder, managerView}) => {

  const subtotal = productPrice ? (productPrice * quantity).toFixed(2) : null
  const handleClick = () => {
    setCurrentOrder({...currentOrder, lineItems: currentOrder.lineItems.filter(item => currentOrder.lineItems.indexOf(item) !== idx)})
  }

  return (
    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:managerView ? '75%' : '100%'}}>
      {(!cashOpen && !managerView && !changeOpen) ? <IconButton aria-label='Delete' onClick={handleClick} sx={{width:'5%'}}>
        <Delete />
      </IconButton> : null}
      <Typography sx={{width:'45%', paddingLeft:'.5rem'}}>{productName}</Typography>
      <Typography sx={{width:'15%'}}>Qty: {quantity}</Typography>
      <Typography variant={managerView ? '' :'caption'} sx={{width:'15%', textAlign:'right'}}>{taxRate === 0 ? 'Tax Exempt' : null}</Typography>
      <Typography sx={{width:'20%', textAlign:'right', marginRight:'5px'}}>${subtotal}</Typography>
    </Box>
  )
};

export default LineItem