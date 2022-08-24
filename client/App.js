import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadOrders, loadCategories, loadProducts } from './store';
import TerminalWrapper from './components/ProductsAndTerminal/TerminalWrapper.jsx';
import ButtonWrapper from './components/TransactionButtons/ButtonWrapper.jsx';

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadOrders());
    dispatch(loadCategories());
    dispatch(loadProducts())
}, [])
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
  const [taxExempt, setTaxExempt] = useState(false);
  const [page, setPage] = useState(0)
  const [cashOpen, setCashOpen] = useState(false);
  const [managerView, setManagerView] = useState(false);
  const taxableSubtotal = currentOrder.lineItems.length ? currentOrder.lineItems.reduce((acc, item) => {
    if(item.taxRate !== 0){
      return acc + (item.productPrice * item.quantity)
    } else { return acc}
  }, 0) : 0.00;
  const taxExemptSubtotal = currentOrder.lineItems.length ? currentOrder.lineItems.reduce((acc, item) => {
    if(item.taxRate === 0){
      return acc + (item.productPrice * item.quantity)
    } else {return acc}
  }, 0) : 0.00;
  const tax = taxableSubtotal * 0.05
  const total = taxableSubtotal + taxExemptSubtotal + tax

  useEffect(()=>{
    setProducts(allProducts)
  },[allProducts])

  useEffect(()=>{
    setPage(0)
    setSelectedProducts(products.slice(0, 12))
  },[products])

  useEffect(()=>{
      setSelectedProducts(products.slice((page*12), (page+1)*12))
  },[page])


  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
        <div className="Terminal" style={{width:"80%", height:'100vh', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <TerminalWrapper managerView={managerView} setManagerView={setManagerView} cashOpen={cashOpen} categories={categories} products={products} setProducts={setProducts} selectedProducts={selectedProducts} page={page} setPage={setPage} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} quantity={quantity} setQuantity={setQuantity} taxRate={taxRate} setTaxRate={setTaxRate} allProducts={allProducts} category={category} setCategory={setCategory} tax={tax} total={total}/>
        </div>
        <div className="Transactions" style={{width:"20%", height:'100vh', textAlign:'center'}}>
          <ButtonWrapper quantity={quantity} managerView={managerView} setManagerView={setManagerView} total={total} tax={tax} setQuantity={setQuantity} cashOpen={cashOpen} setCashOpen={setCashOpen} taxExempt={taxExempt} setTaxExempt={setTaxExempt} setTaxRate={setTaxRate} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
        </div>
      </div>
    </React.Fragment>

  )
}

export default App