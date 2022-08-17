import React from 'react';
import { Box } from '@mui/material';
import Terminal from './Terminal.jsx';

const TerminalWrapper = () => {
  return (
    <React.Fragment sx={{width:'100%', height:'100vw', margin:'0'}}>
      <Terminal />
    </React.Fragment>
  )
}

export default TerminalWrapper