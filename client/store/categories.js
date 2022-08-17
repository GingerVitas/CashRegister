import axios from 'axios';

// Action Types
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

// Action Creators
const _loadCategories = categories => ({type: LOAD_CATEGORIES, categories});
const _addCategory = category => ({type:ADD_CATEGORY, category});
const _deleteCategory = category => ({type: DELETE_CATEGORY, category});

// Thunks
export const loadCategories = () => {
  return async(dispatch) => {
    const categories = (await axios.get('/api/categories')).data;
    dispatch(_loadCategories(categories));
  };
};
export const addCategory = category => {
  return async(dispatch) => {
    const newcategory = (await axios.post('/api/categories', category)).data;
    dispatch(_addCategory(newcategory))
  };
};
export const deleteCategory = category => {
  return async(dispatch) => {
    await axios.delete(`/api/categories/${category.id}`);
    dispatch(_deleteCategory(category));
  };
};
export const updateCategory = category => {
  return async(dispatch) => {
    await axios.put(`/api/categories/${category.id}`, category);
    const categories = (await axios.get('/api/categories')).data;
    dispatch(_loadCategories(categories));
  };
};

// Store
export default (state = [], action) => {
  switch(action.type) {
    case LOAD_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return [...state, action.category];
    case DELETE_CATEGORY:
      return state.filter(category => category.id !== action.category.id);
    default:
      return state
  }
};