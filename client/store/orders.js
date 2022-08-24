import axios from 'axios';

// Action Types
const LOAD_ORDERS = 'LOAD_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

// Action Creators
const _loadOrders = orders => ({type: LOAD_ORDERS, orders});
const _addOrder = order => ({type: ADD_ORDER, order});
const _deleteOrder = order => ({type: DELETE_ORDER, order});

// Thunks
export const loadOrders = () => {
  return async(dispatch) => {
    const orders = (await axios.get('/api/orders')).data
    dispatch(_loadOrders(orders))
  }
};
export const addOrder = order => {
  return async(dispatch) => {
    const newOrder = (await axios.post('/api/orders', order)).data;
    dispatch(_addOrder(newOrder))
  };
};
export const deleteOrder = order => {
  return async(dispatch) => {
    await axios.delete(`/api/orders/${order.id}`);
    dispatch(_deleteOrder(order));
  };
};

// Store
export default (state = [], action) => {
  switch(action.type) {
    case LOAD_ORDERS:
      return action.orders
    case ADD_ORDER:
      return [...state, action.order]
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.order.id)
    default:
      return state
  }
}