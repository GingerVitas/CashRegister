import React from 'react';
import { Box, Typography } from '@mui/material';
import LineItem from './LineItem.jsx';

const Terminal = ({lineItems, setCurrentOrder, currentOrder, tax, total, cashOpen}) => {

  return (
    <Box sx={{height:'300px', backgroundColor:'white', width: cashOpen ? '98%' : '85%', overflowY:'scroll', border:'2px solid black', borderRadius:'10px', margin:'0', marginTop:'1rem', display:'flex', flexDirection:'column-reverse', alignItems:'center'}}>
      {total > 0 &&<Box sx={{display:'flex', textAlign:'right', marginRight:'5px', minWidth:'100%'}}>
        <Typography sx={{width:'100%'}}>Total: ${Number(total).toFixed(2)}</Typography>
      </Box>}
      {total > 0 && <Box sx={{display:'flex', textAlign:'right', marginRight:'5px', minWidth:'100%'}}>
        <Typography sx={{width:'100%'}}>Tax: ${Number(tax).toFixed(2)}</Typography>
      </Box>}
      {lineItems?.map((lineItem, idx) => <LineItem key={idx} idx={idx} cashOpen={cashOpen} productName={lineItem.productName} productPrice={lineItem.productPrice} quantity={lineItem.quantity} taxRate={lineItem.taxRate} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/>)}
    </Box>
  )
}

export default Terminal