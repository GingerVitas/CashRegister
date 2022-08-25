import React, {useRef, useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import LineItem from './LineItem.jsx';
import ReceiptHeader from './ReceiptHeader.jsx';

const Terminal = ({lineItems, managerView, setCurrentOrder, currentOrder, tax, total, cashOpen, changeOpen}) => {

  const scroll = useRef()
  useEffect(()=> {
    scroll.current.scrollIntoView({behavior:'smooth'})
  },[lineItems])

  return (
    <Box sx={{display:'flex', width:'100%', height:'80%', justifyContent:'center'}}>
      <Box sx={{height:'100%', alignSelf:'center', backgroundColor:'white', width: '95%', border:'1px solid black', borderRadius:'5px', margin:'0', marginTop:'1rem', marginRight:'.5rem', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        {(cashOpen || changeOpen) && <ReceiptHeader/>}
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', overflowY:'scroll', overflowX:'hidden'}}>
          {lineItems?.map((lineItem, idx) => <LineItem key={idx} idx={idx} changeOpen={changeOpen} cashOpen={cashOpen} managerView={managerView} productName={lineItem.productName} productPrice={lineItem.productPrice} quantity={lineItem.quantity} taxRate={lineItem.taxRate} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/>)}
          <div ref={scroll}></div>
        </Box>
        {total > 0 && <Box sx={{width:'100%', alignSelf:'flex-end'}}>
          <Box sx={{display:'flex', textAlign:'right', width:'100%'}}>
            <Typography sx={{width:'100%', marginRight:'.5rem'}}>Tax: ${Number(tax).toFixed(2)}</Typography>
          </Box>
          <Box sx={{display:'flex', textAlign:'right', width:'100%'}}>
            <Typography sx={{width:'100%', marginRight:'.5rem', fontWeight:'bold'}}>Total: ${Number(total).toFixed(2)}</Typography>
          </Box>
        </Box>}
      
      </Box>
    </Box>

  )
}
export default Terminal