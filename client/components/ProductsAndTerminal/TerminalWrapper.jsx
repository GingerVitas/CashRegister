import React, {useState} from 'react';
import { Box } from '@mui/material';
import Terminal from './Terminal.jsx';
import CategorySelect from './CategorySelect.jsx';

const TerminalWrapper = ({categories, allProducts, setProducts, selectedProducts, setSelectedProducts, currentOrder, setCurrentOrder, quantity, taxRate}) => {

  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100vh', margin:'0'}}>
      <Terminal lineItems={currentOrder.lineItems} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/>
      <CategorySelect categories={categories} setProducts={setProducts} allProducts={allProducts} />
      <div style={{width:'100%', display:'flex'}}>
        {/* <ProductGrid products={selectedProducts} setCurrentOrder={setCurrentOrder} quantity={quantity} taxRate={taxRate} />*/}
        {/* <PaginationButtons setSelectedProducts={setSelectedProducts} */}
      </div>
    </Box>
  )
}

export default TerminalWrapper