import React, {useState} from 'react';
import { Box, Button} from '@mui/material';
import Terminal from './Terminal.jsx';
import CategorySelect from './CategorySelect.jsx';
import ProductGrid from './ProductGrid.jsx';
import PaginationButtons from './PaginationButtons.jsx';
import ProductManagementTab from '../TransactionButtons/ProductManagementTab.jsx';
import OrderManagementTab from '../TransactionButtons/OrderManagementTab.jsx';

const TerminalWrapper = ({categories, managerView, cashOpen, category, setCategory, allProducts, products, setProducts, selectedProducts, page, setPage, currentOrder, setCurrentOrder, quantity, setQuantity, taxRate, setTaxRate, tax, total}) => {

  const [display, setDisplay] = useState('')

  const buttonStyle = {margin:'1rem'}

  if(!managerView) { return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100vh', margin:'0'}}>
      <Terminal lineItems={currentOrder.lineItems} cashOpen={cashOpen} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder} taxRate={taxRate} tax={tax} total={total}/>
      <CategorySelect key={selectedProducts} categories={categories} category={category} setCategory={setCategory} setProducts={setProducts} allProducts={allProducts} />
      <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <ProductGrid key={selectedProducts} products={selectedProducts} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} quantity={quantity} setQuantity={setQuantity} taxRate={taxRate} setTaxRate={setTaxRate} />
        <PaginationButtons key={page} products={products} setPage={setPage} page={page} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
      </div>
    </Box>
  )
  } else { return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', height:'100vh', margin:'0'}}>
      <h1 style={{textAlign:'center'}}>Manager Dashboard</h1>
      <Box sx={{marginTop:'3rem', display:'flex', justifyContent:'center'}}>
        <Button sx={buttonStyle} name='inventory' variant={display === 'products' ? 'contained' : 'outlined'} onClick={()=> setDisplay('products')}>Manage Products</Button>
        <Button sx={buttonStyle} name='orders' variant={display === 'orders' ? 'contained' : 'outlined'} onClick={()=> setDisplay('orders')}>Manage Orders</Button>
      </Box>
      <Box sx={{ width:'85%', justifyContent:'center', padding:'1rem', margin:'1rem'}}>
          { display === 'products' ? <ProductManagementTab /> 
            : display === 'orders' ? <OrderManagementTab /> : ''} 
      </Box>
    </Box>
  )}
}

export default TerminalWrapper