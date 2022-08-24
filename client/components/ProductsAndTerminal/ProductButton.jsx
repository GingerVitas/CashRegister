import React, {useState} from 'react';
import {Card, CardActionArea, CardContent, Typography, Snackbar, Alert} from '@mui/material';


const ProductButton = ({product, quantity, setQuantity, taxRate, setTaxRate, currentOrder, setCurrentOrder}) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = () => {
    if(product.stock < quantity) {
      setOpen(true);
    } else {
      const subtotal = product.price * quantity * (1+ taxRate) 
      const currentLineItem = currentOrder.lineItems.find(lineItem => lineItem.id === product.id && lineItem.taxRate === taxRate) ?? undefined;
      if(currentLineItem) {
        const idx = currentOrder.lineItems.indexOf(currentLineItem)
        currentOrder.lineItems[idx].quantity += quantity*1
        currentOrder.lineItems[idx].subtotal += subtotal*1
        setCurrentOrder({...currentOrder});
        setQuantity(1)
      } else {
        setCurrentOrder({...currentOrder, lineItems: [...currentOrder.lineItems, {productName:product.productName, productPrice:product.price, id:product.id, quantity, taxRate, subtotal}]});
        setQuantity(1);
      }

    }
  }

  return (
    <React.Fragment>
      <Card variant='outlined' color={product.stock < 1 ? '#e57373' : null} sx={{width:'100%', height:'100%', textAlign:'center', backgroundColor:product.stock < 1 ? 'gray' : 'white' }}>
        <CardActionArea onClick={handleClick} disabled={product.stock < 1 ? true : false} sx={{height:'100%'}}>
          <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography gutterBottom variant='h5'>{product.productName} <br/> {product.stock < 1 ? 'Out of stock' : null}</Typography>
            <Typography variant='h6'>${product.price}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={handleClose} severity='error'>
          We only have {product.stock} {product.productName}s in stock. Please reduce your quantity.
        </Alert>
      </Snackbar>
    </React.Fragment>

  )

}

export default ProductButton