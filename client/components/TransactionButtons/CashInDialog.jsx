import React, {useState} from 'react';
import {Box, TextField, Dialog, DialogActions, DialogContent, Button, DialogTitle} from '@mui/material';
import Terminal from '../ProductsAndTerminal/Terminal.jsx';

const CashInDialog = ({cashOpen, handleCashClose, cashIn, handleCashInChange, handleSubmit, setCurrentOrder, currentOrder, tax, total}) => {

  return(
    <Dialog open={cashOpen} onClose={handleCashClose} fullWidth maxWidth='md'>
      <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
       <Terminal lineItems={currentOrder.lineItems} setCurrentOrder={setCurrentOrder} tax={tax} total={total} cashOpen={cashOpen}/>
      </Box>
      <DialogTitle>Cash In</DialogTitle>
      <DialogContent>
        <TextField
          variant='standard'
          inputProps={{ inputMode:'numeric', pattern:'^\d*(\.\d{0,2})?$'}}
          value={cashIn}
          onChange={handleCashInChange}
          id='Cash In'
          label='Cash In'
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCashClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CashInDialog