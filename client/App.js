import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {loadOrders, loadCategories, loadProducts } from './store';
import TerminalWrapper from './components/ProductsAndTerminal/TerminalWrapper.jsx';

const App = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadOrders());
    dispatch(loadCategories());
    dispatch(loadProducts())
  })

  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
        <div className="Terminal" style={{width:"80%", height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'dodgerBlue'}}>
          <TerminalWrapper />
        </div>
        <div className="Transactions" style={{width:"20%", height:'100vh', backgroundColor:'red'}}>
          <h1>Test</h1>
        </div>
      </div>

    </React.Fragment>

  )
}

export default App