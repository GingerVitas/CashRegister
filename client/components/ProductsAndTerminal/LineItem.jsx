import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LineItem = ({idx, productName, productPrice, changeOpen, quantity, cashOpen, taxRate, setCurrentOrder, currentOrder, managerView}) => {

  const subtotal = productPrice ? (productPrice * quantity).toFixed(2) : null
  const handleClick = () => {
    setCurrentOrder({...currentOrder, lineItems: currentOrder.lineItems.filter(item => currentOrder.lineItems.indexOf(item) !== idx)})
  }

  return (
    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:managerView ? '75%' : '100%'}}>
      {(!cashOpen && !managerView && !changeOpen) ? <IconButton aria-label='Delete' onClick={handleClick} sx={{width:'5%'}}>
        <DeleteForeverIcon />
      </IconButton> : null}
      <Typography sx={{width:'55%', paddingLeft:'.5rem'}}>{productName}</Typography>
      <Typography sx={{width:'15%'}}>Qty: {quantity}</Typography>
      <Typography variant={managerView ? '' :'caption'} sx={{width:'15%', textAlign:'right'}}>{taxRate === 0 ? 'Tax Exempt' : null}</Typography>
      <Typography sx={{width:'10%', textAlign:'right', marginRight:'5px'}}>${subtotal}</Typography>
    </Box>
  )
};

export default LineItem