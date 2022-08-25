import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

const QuantityButton = ({quantity, setQuantity, managerView}) => {
  const [open, setOpen] = useState(false)
  const [localQuantity, setLocalQuantity] = useState(1)
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setLocalQuantity(1)
    setOpen(false)
  }
  const handleChange = (e) => {
    setLocalQuantity(e.target.value)
  }
  const handleSubmit = (e) => {
    setQuantity(localQuantity)
    handleClose()
  }
   
  return (
    <React.Fragment>
      <Button variant={quantity > 1 ? 'contained' : 'outlined'} onClick={handleOpen} sx={{margin:'1rem', visibility: managerView ? 'hidden' : '', backgroundColor: !quantity > 1 ? 'white' : ''}}>Quantity: {quantity}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quantity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter quantity for next transaction.
          </DialogContentText>
          <TextField
            variant='standard'
            type='number'
            value={localQuantity}
            onChange={handleChange}
            id='quantity'
            label='Quantity'
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default QuantityButton