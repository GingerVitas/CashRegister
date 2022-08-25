import React from 'react';
import {Box} from '@mui/material';
import QuantityButton from './QuantityButton.jsx';
import TaxExemptButton from './TaxExemptButton.jsx';
import CashButton from './CashButton.jsx';
import ManagerButton from './ManagerButton.jsx';

const ButtonWrapper = ({quantity, setQuantity, managerView, setManagerView, cashOpen, setCashOpen, total, tax, taxExempt, setTaxExempt, setTaxRate, currentOrder, setCurrentOrder}) => {

  const buttonStyles = {
    margin:'1rem', 
    visibility: managerView ? 'hidden' : ''
  }

  return (
    <Box sx={{display:'flex', height:'7vh', margin:'0', justifyContent:'center'}}>
      <ManagerButton managerView={managerView} setManagerView={setManagerView} />
      <QuantityButton managerView={managerView} quantity={quantity} setQuantity={setQuantity} />
      <TaxExemptButton managerView={managerView} taxExempt={taxExempt} setTaxExempt={setTaxExempt} setTaxRate={setTaxRate} />
      <CashButton managerView={managerView} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} tax={tax} total={total} cashOpen={cashOpen} setCashOpen={setCashOpen} />
    </Box>
  )
}

export default ButtonWrapper
