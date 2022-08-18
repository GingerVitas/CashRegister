import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadOrders, loadCategories, loadProducts } from './store';
import TerminalWrapper from './components/ProductsAndTerminal/TerminalWrapper.jsx';

const App = () => {


  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const [category, setCategory] = useState(0);
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [currentOrder, setCurrentOrder] = useState({
    lineItems:[],
    complete: false
  });
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0.05);
  const [page, setPage] = useState(0)

  useEffect(()=>{
    dispatch(loadOrders());
    dispatch(loadCategories());
    dispatch(loadProducts())
}, [])

  useEffect(()=>{
    setProducts(allProducts)
  },[allProducts])

  useEffect(()=>{
    setPage(0)
    setSelectedProducts(products.slice(0, 12))
  },[products])

  useEffect(()=>{
    if(page > 0){
      setSelectedProducts(products.slice((page*12), (page+1)*12))
    } else {
      setSelectedProducts(products.slice((page*12)+page, (page+1)*12))
    }
  },[page])


  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
        <div className="Terminal" style={{width:"80%", height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'dodgerBlue'}}>
          <TerminalWrapper key={products} categories={categories} products={products} setProducts={setProducts} selectedProducts={selectedProducts} page={page} setPage={setPage} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} quantity={quantity} setQuantity={setQuantity} taxRate={taxRate} setTaxRate={setTaxRate} allProducts={allProducts} category={category} setCategory={setCategory}/>
        </div>
        <div className="Transactions" style={{width:"20%", height:'100vh', backgroundColor:'red', textAlign:'center'}}>
          <h1>Test</h1>
        </div>
      </div>
    </React.Fragment>

  )
}

export default App