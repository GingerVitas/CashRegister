import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadOrders, loadCategories, loadProducts } from './store';
import TerminalWrapper from './components/ProductsAndTerminal/TerminalWrapper.jsx';

const App = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadOrders());
    dispatch(loadCategories());
    dispatch(loadProducts())
  }, [])

  const allProducts = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const [products, setProducts] = useState(allProducts)
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0,11))
  const [currentOrder, setCurrentOrder] = useState({
    lineItems:[],
    complete: false
  });
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0.05);


  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
        <div className="Terminal" style={{width:"80%", height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'dodgerBlue'}}>
          <TerminalWrapper categories={categories} setProducts={setProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} quantity={quantity} taxRate={taxRate} allProducts={allProducts}/>
        </div>
        <div className="Transactions" style={{width:"20%", height:'100vh', backgroundColor:'red', textAlign:'center'}}>
          <h1>Test</h1>
        </div>
      </div>
    </React.Fragment>

  )
}

export default App