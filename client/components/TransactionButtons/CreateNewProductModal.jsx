import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField, MenuItem} from '@mui/material';

const CreateNewProductModal = ({ open, columns, onClose, onSubmit, categories }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => {
              if(column.accessorKey !== 'categoryName') {
                return (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
              )} else {
                return (
                  <TextField
                  select
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  >
                    {categories.map(category => {
                      return <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                    })}
                  </TextField>
                )
              }
              })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewProductModal