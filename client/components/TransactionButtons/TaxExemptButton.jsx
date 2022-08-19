import React from 'react';
import {Button} from '@mui/material'

const TaxExemptButton = ({taxExempt, setTaxExempt, setTaxRate}) => {

  const handleClick = () => {
    if(taxExempt) {
      setTaxExempt(false)
      setTaxRate(0.05)
    } else {
      setTaxExempt(true)
      setTaxRate(0)
    }
  }
  
  return (
      <Button variant={taxExempt ? 'contained' : 'outlined'} onClick={handleClick}>Tax Exempt</Button>
  )
}

export default TaxExemptButton