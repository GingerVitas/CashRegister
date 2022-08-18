import React, {useState} from 'react';
import { Box, MenuItem, Select } from '@mui/material';

const CategorySelect = ({categories, setProducts, allProducts}) => {

  const [category, setCategory] = useState(0);

  const handleChange = (e) => {
    setCategory(e.target.value)
    if(e.target.value === 0){
      setProducts(allProducts)
    }
     else {
      setProducts(allProducts.filter(product => product.categoryId === e.target.value))
     }
     
  };

  return (
    <Box sx={{textAlign:'center', marginTop:'1rem'}}>
      <Select 
        labelId='Category Select'
        id='Category Select'
        value={category}
        label="Product Category"
        onChange={handleChange}
        sx={{minWidth:'200px'}}
      >
        <MenuItem value={0}>All Products</MenuItem>
        {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>)}
      </Select>
    </Box>
 
  )
};

export default CategorySelect;
