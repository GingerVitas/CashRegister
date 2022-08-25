import React, {useState} from 'react';
import {Box, Card, CardActionArea, CardContent, Typography} from '@mui/material';
import CustomProductDialog from './CustomProductDialog.jsx';

const PaginationButtons = ({page, setPage, products, currentOrder, setCurrentOrder}) => {
  const [open, setOpen] = useState(false)

  const handleNextPage = () => {
    setPage(page+1)
  }
  const handlePrevPage = () => {
    setPage(page-1)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{display:'flex', width:'100%'}}>
      <Box sx={{width:'30%'}}></Box>
      <Box sx={{display:'flex', width:'40%', justifyContent:'center', margin:'2rem'}}>
        {page > 0 && <Card variant='outlined' id='Prev Page' sx={{width:'25%', height:'auto', marginRight:'.5rem', textAlign:'center'}}>
        <CardActionArea onClick={handlePrevPage} sx={{height:'100%'}}>
          <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h5'>Prev</Typography>
          </CardContent>
        </CardActionArea>
        </Card>}
        {products.length >= (((page+1)*16)+1) && <Card variant='outlined' id='Next Page' sx={{width:'25%', height:'auto', marginLeft:'.5rem', textAlign:'center'}}>
        <CardActionArea onClick={handleNextPage} sx={{height:'100%'}}>
          <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h5'>Next</Typography>
          </CardContent>
        </CardActionArea>
        </Card>}
      </Box>
      <Box sx={{display:'flex', justifyContent:'center', width:'30%'}}>
        <Card variant='outlined' id='Custom Item' sx={{width:'50%', height:'auto', margin:'2rem 2.5rem 2rem 2rem', textAlign:'center'}}>
          <CardActionArea onClick={handleOpen} sx={{height:'100%'}}>
            <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <Typography variant='h5'>Custom</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    <CustomProductDialog open={open} handleClose={handleClose} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder}/>
    </Box>
    
  )
}

export default PaginationButtons