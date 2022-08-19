import React, {useState} from 'react';
import {Button, Switch, FormControlLabel, Box, Dialog, DialogActions, DialogTitle, DialogContent, TextField} from '@mui/material';

const CustomProductDialog = ({open, handleClose, currentOrder, setCurrentOrder}) => {

  const [taxExempt, setTaxExempt] = useState(false);
  const [currentLineItem, setCurrentLineItem] = useState({
    productName: 'Generic Item',
    productPrice: 0.01,
    taxRate: 0.05,
    quantity: 1
  });

  const handleProductNameChange = (e) => {
    setCurrentLineItem({...currentLineItem, productName: e.target.value})
  }
  const handleQuantityChange = (e) => {
    setCurrentLineItem({...currentLineItem, quantity: e.target.value})
  }
  const handlePriceChange = (e) => {
    setCurrentLineItem({...currentLineItem, productPrice: e.target.value})
  }
  const handleTaxChange = (e) => {
    setTaxExempt(e.target.checked)
    setCurrentLineItem({...currentLineItem, taxRate: e.target.checked ? 0 : 0.05})
  }
  const handleSubmit = () => {
    console.log(taxExempt, currentLineItem.taxRate, currentOrder)
    setCurrentOrder({...currentOrder, lineItems: [...currentOrder.lineItems, currentLineItem]})
    setCurrentLineItem({
      productName: 'Generic Item',
      productPrice: 0.01,
      taxRate: 0.05,
      quantity: 1
    })
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Custom Item</DialogTitle>
      <DialogContent>
        <Box sx={{display:'flex', flexDirection:'column'}}>
          <TextField 
            id='Product Name'
            label='Product Name'
            value={currentLineItem.productName}
            onChange={handleProductNameChange}
            variant='standard'
            required
          />
          <Box sx={{display:'flex'}}>
            <TextField 
              id='Quantity'
              label='Quantity'
              type='number'
              value={currentLineItem.quantity}
              onChange={handleQuantityChange}
              variant='standard'
              required
            />
            <TextField 
              id='Product Price'
              label='Price'
              type='number'
              onChange={handlePriceChange}
              value={currentLineItem.productPrice}
              variant='standard'
              required
            />
          </Box>
          <FormControlLabel 
            control={<Switch checked={taxExempt} onChange={handleTaxChange}/>}
            labelPlacement='start' 
            label='Tax Exempt?' 
              />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )

}

export default CustomProductDialog