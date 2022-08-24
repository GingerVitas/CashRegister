import React from 'react';
import {Box} from '@mui/material';
import QuantityButton from './QuantityButton.jsx';
import TaxExemptButton from './TaxExemptButton.jsx';
import CashButton from './CashButton.jsx';
import ManagerButton from './ManagerButton.jsx';

const ButtonWrapper = ({quantity, setQuantity, managerView, setManagerView, cashOpen, setCashOpen, total, tax, taxExempt, setTaxExempt, setTaxRate, currentOrder, setCurrentOrder}) => {

  return (
    <Box sx={{display:'flex', height:'100%', flexDirection:'column', margin:'1rem', justifyContent:'space-evenly'}}>
      <ManagerButton managerView={managerView} setManagerView={setManagerView} />
      <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      <TaxExemptButton taxExempt={taxExempt} setTaxExempt={setTaxExempt} setTaxRate={setTaxRate} />
      <CashButton currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} tax={tax} total={total} cashOpen={cashOpen} setCashOpen={setCashOpen}/>
    </Box>
  )
}

export default ButtonWrapper
