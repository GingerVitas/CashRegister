import React from 'react';
import {Box} from '@mui/material';
import QuantityButton from './QuantityButton.jsx';
import TaxExemptButton from './TaxExemptButton.jsx';

const ButtonWrapper = ({quantity, setQuantity, taxExempt, setTaxExempt, setTaxRate}) => {

  return (
    <Box sx={{display:'flex', height:'100%', flexDirection:'column', margin:'1rem', justifyContent:'space-evenly'}}>
      <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      <TaxExemptButton taxExempt={taxExempt} setTaxExempt={setTaxExempt} setTaxRate={setTaxRate} />
    </Box>
  )
}

export default ButtonWrapper
