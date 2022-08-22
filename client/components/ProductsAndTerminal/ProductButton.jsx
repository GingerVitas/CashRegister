import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from '@mui/material';


const ProductButton = ({product, quantity, setQuantity, taxRate, setTaxRate, currentOrder, setCurrentOrder}) => {

  const handleClick = () => {
    const subtotal = product.price * quantity * (1+ taxRate)
    setCurrentOrder({...currentOrder, lineItems: [...currentOrder.lineItems, {productName:product.productName, productPrice:product.price, quantity, taxRate, subtotal}]});
    setQuantity(1);
    setTaxRate(0.05)
  }

  return (
    <Card variant='outlined' sx={{width:'100%', height:'100%', textAlign:'center'}}>
      <CardActionArea onClick={handleClick} sx={{height:'100%'}}>
        <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography gutterBottom variant='h5'>{product.productName}</Typography>
          <Typography variant='h6'>${product.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )

}

export default ProductButton