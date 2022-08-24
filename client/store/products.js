import axios from 'axios';

// Action Types
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Action Creators
const _loadProducts = products => ({type: LOAD_PRODUCTS, products});
const _addProduct = product => ({type:ADD_PRODUCT, product});
const _deleteProduct = product => ({type: DELETE_PRODUCT, product});

// Thunks
export const loadProducts = () => {
  return async(dispatch) => {
    const products = (await axios.get('/api/products')).data;
    dispatch(_loadProducts(products));
  };
};
export const addProduct = product => {
  return async(dispatch) => {
    const newProduct = (await axios.post('/api/products', product)).data;
    dispatch(_addProduct(newProduct))
  };
};
export const deleteProduct = product => {
  return async(dispatch) => {
    await axios.delete(`/api/products/${product.id}`);
    dispatch(_deleteProduct(product));
  };
};
export const updateProduct = product => {
  return async(dispatch) => {
    console.log(product)
    await axios.put(`/api/products/${product.id}`, product);
    const products = (await axios.get('/api/products')).data;
    dispatch(_loadProducts(products));
  };
};
export const removeStock = (product) => {
  return async(dispatch) => {
    await axios.put(`/api/products/removeStock/${product.id}`, product)
    const products = (await axios.get('/api/products')).data;
    dispatch(_loadProducts(products));
  }
}

// Store
export default (state = [], action) => {
  switch(action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [action.product, ...state];
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    default:
      return state
  }
};