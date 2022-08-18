import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import Terminal from './Terminal.jsx';
import CategorySelect from './CategorySelect.jsx';
import ProductGrid from './ProductGrid.jsx';
import PaginationButtons from './PaginationButtons.jsx';

const TerminalWrapper = ({categories, category, setCategory, allProducts, products, setProducts, selectedProducts, page, setPage, currentOrder, setCurrentOrder, quantity, setQuantity, taxRate, setTaxRate}) => {

  useEffect(()=> {
    console.log(selectedProducts)
  },[])

  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100vh', margin:'0'}}>
      <Terminal lineItems={currentOrder.lineItems} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/>
      <CategorySelect key={selectedProducts} categories={categories} category={category} setCategory={setCategory} setProducts={setProducts} allProducts={allProducts} />
      <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <ProductGrid key={selectedProducts} products={selectedProducts} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} quantity={quantity} setQuantity={setQuantity} taxRate={taxRate} setTaxRate={setTaxRate} />
        <PaginationButtons key={page} products={products} setPage={setPage} page={page} />
      </div>
    </Box>
  )
}

export default TerminalWrapper