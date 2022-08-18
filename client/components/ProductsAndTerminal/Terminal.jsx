import React from 'react';
import { Box, Typography } from '@mui/material';
import LineItem from './LineItem.jsx';

const Terminal = ({lineItems, setCurrentOrder, currentOrder}) => {
  const total = lineItems.length ? lineItems.reduce((acc, item) => {
    return acc + (item.productPrice * item.quantity * (1 + item.taxRate))
  }, 0) : 0.00;
  return (
    <Box sx={{height:'300px', backgroundColor:'white', width:'85%', overflowY:'scroll', border:'2px solid black', borderRadius:'10px', margin:'0', marginTop:'1rem', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
      {lineItems?.map((lineItem, idx) => <LineItem key={idx} idx={idx} productName={lineItem.productName} productPrice={lineItem.productPrice} quantity={lineItem.quantity} taxRate={lineItem.taxRate} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/>)}
      <Box sx={{display:'flex', textAlign:'right', marginRight:'5px', minWidth:'100%'}}>
        <Typography sx={{width:'100%'}}>Total: ${total.toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}

export default Terminal