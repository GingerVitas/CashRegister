import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Snackbar, Alert} from '@mui/material';
import CashInDialog from './CashInDialog.jsx';
import ChangeOutDialog from './ChangeOutDialog.jsx';
import { addOrder } from '../../store/orders.js';

const CashButton = ({currentOrder, setCurrentOrder, cashOpen, setCashOpen, tax, total}) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cashIn, setCashIn] = useState(0.00)
  const [changeOpen, setChangeOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [changeArr, setChangeArr] = useState([]);
  const [totalChange, setTotalChange] = useState(0)
  const cashUnits = {
    'Hundreds': 10000,
    'Fifties': 5000,
    'Twenties': 2000,
    'Tens': 1000,
    'Fives': 500,
    'Ones': 100,
    'Quarters': 25,
    'Dimes': 10,
    'Nickels': 5,
    'Pennies': 1
  };

  const changeOut = (cash) => {
    let changeInCents = cash*100 - total*100
    setTotalChange(changeInCents/100)
    const changeArr = [];
    for (const bill in cashUnits) {
      let currentBill = [bill, 0]
      while(changeInCents >= cashUnits[bill]) {
        currentBill[1] += 1
        changeInCents -= cashUnits[bill]
      }
      if (currentBill[1] > 0 ) {
        changeArr.push(currentBill)
      }
    }
    return changeArr 
  }

  const handleCashOpen = () => {
    if(!currentOrder.lineItems.length){
      setErrorMessage('Please add items to the order.')
      setSnackbarOpen(true);
    } else {
      setCashOpen(true)
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }
  const handleCashClose = () => {
    setCashOpen(false)
  };
  const handleChangeOpen = () => {
    setChangeOpen(true)
  }
  const handleChangeClose = () => {
    setChangeOpen(false)
    setCurrentOrder({
      lineItems:[],
      complete: false
    }),
    setCashIn(0.00)
  }
  const handleCashInChange = (e) => {
    setCashIn(e.target.value)
  }
  const handleSubmit = async() => {
    if(cashIn > total) {
      const finalOrder = {...currentOrder, complete:true}
      dispatch(addOrder(finalOrder))
      setChangeArr(changeOut(cashIn))
      handleCashClose()
      handleChangeOpen();
    } else {
      setErrorMessage('You have provided insufficient funds')
      setSnackbarOpen(true)
    }
    
  }

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleCashOpen}>Cash</Button>
      <CashInDialog cashOpen={cashOpen} handleCashClose={handleCashClose} total={total} tax={tax} cashIn={cashIn} handleSubmit={handleSubmit} handleCashInChange={handleCashInChange} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
      <ChangeOutDialog changeOpen={changeOpen} totalChange={totalChange} changeArr={changeArr} handleChangeClose={handleChangeClose} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal:'center' }}
        autoHideDuration={3000}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
export default CashButton