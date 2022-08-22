import React, {useState, useEffect} from 'react';
import {Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const ChangeOutDialog = ({changeOpen, changeArr, totalChange, handleChangeClose}) => {

  return (
    <React.Fragment>
      <Dialog open={changeOpen} onClose={handleChangeClose}>
        <DialogTitle>Total Change: ${totalChange.toFixed(2)}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{display:'flex', flexDirection:'column'}}>
            {changeArr.map(bill => <Typography component='span' variant='h5' key={bill}>{bill[0]}: {bill[1]}</Typography>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ChangeOutDialog