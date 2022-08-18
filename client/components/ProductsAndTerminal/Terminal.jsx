import React from 'react';
import { Box } from '@mui/material';
import LineItem from './LineItem.jsx';

const Terminal = ({lineItems, setCurrentOrder, currentOrder}) => {
  return (
    <Box sx={{height:'300px', backgroundColor:'white', width:'85%', overflowY:'scroll', border:'2px solid black', borderRadius:'10px', margin:'0', marginTop:'1rem', display:'flex', flexDirection:'column-reverse', justifyContent:'flex-start', alignItems:'center'}}>
        {lineItems?.map((lineItem, idx) => <LineItem key={idx} idx={idx} productName={lineItem.productName} productPrice={lineItem.productPrice} quantity={lineItem.quantity} taxRate={lineItem.taxRate} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/>)}
    </Box>
  )
}

export default Terminal