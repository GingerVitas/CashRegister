import React, {useRef} from 'react';
import {Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import print from 'print-js';
import html2pdf from 'html2pdf.js';
import Terminal from '../ProductsAndTerminal/Terminal.jsx';

const ChangeOutDialog = ({changeOpen, cashOpen, changeArr, totalChange, handleChangeClose, currentOrder,  tax, total}) => {

  const printRef = useRef()
  const handlePrint = async() => {
    const options = {
      margin: [4,10,13,10],
      filename: 'Shopping List.pdf',
      image: {type: 'jpeg', quality: 0.98},
      jsPdf: {unit: 'in', format:'letter', orientation:'portrait'},
      html2canvas: {scale: 2},
      pagebreak: {mode: 'avoid-all', after:'pageBreak'}
    }

    const pdf = await html2pdf().set(options).from(printRef.current).toPdf().get('pdf')

    const printData = pdf.output('blob');
    const blobUrl = URL.createObjectURL(printData);
    print(blobUrl)
  }

  return (
    <React.Fragment>
      <Dialog open={changeOpen} onClose={handleChangeClose} fullWidth maxWidth='md'>
      <Box ref={printRef} sx={{display:'flex', justifyContent:'center', width:'100%'}}>
       <Terminal lineItems={currentOrder.lineItems} tax={tax} total={total} changeOpen={changeOpen} cashOpen={cashOpen}/>
      </Box>
        <DialogTitle>Total Change: ${totalChange.toFixed(2)}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{display:'flex', flexDirection:'column'}}>
            {changeArr.map(bill => <Typography component='span' variant='h5' key={bill}>{bill[0]}: {bill[1]}</Typography>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeClose}>Close</Button>
          <Button onClick={handlePrint}>Print Receipt</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ChangeOutDialog