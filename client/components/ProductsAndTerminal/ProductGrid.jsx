import React from 'react';
import {Grid} from '@mui/material';
import ProductButton from './ProductButton.jsx';

const ProductGrid = ({products, currentOrder, setCurrentOrder, quantity, setQuantity, taxRate, setTaxRate}) => {
  
  return(
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='stretch'
      flexWrap='wrap'
      spacing={2}
      columnSpacing={2}
      sx={{width:'85%', margin:'0', textAlign:'center'}}
    >
      {products.map(product => <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={product.id}><ProductButton product={product} quantity={quantity} setQuantity={setQuantity} setTaxRate={setTaxRate} taxRate={taxRate} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder}/></Grid>)}
    </Grid>
  )
}

export default ProductGrid
