import React from 'react';
import { Button } from '@mui/material';

const ManagerButton = ({managerView, setManagerView}) => {

  const handleClick = () => {
    setManagerView(!managerView)
  }

  return (
    <Button variant={managerView ? 'contained' : 'outlined'} onClick={handleClick}>Manager View</Button>
  )
}

export default ManagerButton