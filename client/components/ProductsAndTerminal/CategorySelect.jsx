import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

const CategorySelect = ({categories, category, setCategory, setProducts, allProducts}) => {


  const handleChange = (e) => {
    setCategory(e.target.value)
    if(e.target.value === 0){
      setProducts(allProducts)
      setCategory(e.target.value)
    } else {
      setProducts(allProducts.filter(product => product.categoryId === e.target.value))
      setCategory(e.target.value)
     }
  };

  return (
    <Box sx={{textAlign:'center', marginTop:'1rem'}}>
      <TextField 
        id='Category Select'
        value={category}
        label="Product Category"
        onChange={handleChange}
        sx={{minWidth:'200px', backgroundColor:'white'}}
        select
      >
        <MenuItem value={0}>All Products</MenuItem>
        {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
      </TextField>
    </Box>
 
  )
};

export default CategorySelect;
