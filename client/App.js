import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadOrders, loadCategories, loadProducts } from './store';
import TerminalWrapper from './components/ProductsAndTerminal/TerminalWrapper.jsx';

const App = () => {


  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const [products, setProducts] = useState(useSelector(state=> state.products))
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0,12))
  const [currentOrder, setCurrentOrder] = useState({
    lineItems:[],
    complete: false
  });
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0.05);

  useEffect(()=>{
    dispatch(loadOrders());
    dispatch(loadCategories());
    dispatch(loadProducts())
}, [])

  useEffect(()=>{
    setProducts(allProducts)
  },[allProducts])

  useEffect(()=>{
    setSelectedProducts(products.slice(0,12))
  },[products])



  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
        <div className="Terminal" style={{width:"80%", height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'dodgerBlue'}}>
          <TerminalWrapper key={products} categories={categories} setProducts={setProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} quantity={quantity} setQuantity={setQuantity} taxRate={taxRate} setTaxRate={setTaxRate} allProducts={allProducts}/>
        </div>
        <div className="Transactions" style={{width:"20%", height:'100vh', backgroundColor:'red', textAlign:'center'}}>
          <h1>Test</h1>
        </div>
      </div>
    </React.Fragment>

  )
}

export default App