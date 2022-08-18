import React from 'react';
import {Box, Card, CardActionArea, CardContent, Typography} from '@mui/material'

const PaginationButtons = ({page, setPage, products}) => {

  const handleNextPage = () => {
    setPage(page+1)
  }
  const handlePrevPage = () => {
    setPage(page-1)
  }

  return (
    <Box sx={{display:'flex', justifyContent:'center', margin:'1rem'}}>
      {page > 0 && <Card variant='outlined' id='Prev Page' sx={{width:'100%', height:'auto', marginRight:'.5rem', textAlign:'center'}}>
      <CardActionArea onClick={handlePrevPage} sx={{height:'100%'}}>
        <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography variant='h5'>Prev</Typography>
        </CardContent>
      </CardActionArea>
      </Card>}
      {products.length > (((page+1)*12)+1) && <Card variant='outlined' id='Next Page' sx={{width:'100%', height:'auto', marginLeft:'.5rem', textAlign:'center'}}>
      <CardActionArea onClick={handleNextPage} sx={{height:'100%'}}>
        <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography variant='h5'>Next</Typography>
        </CardContent>
      </CardActionArea>
      </Card>}
    </Box>
  )
}

export default PaginationButtons