import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialReactTable from 'material-react-table';
import { Box, Button, Tooltip, IconButton, MenuItem,  } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteProduct, updateProduct, addProduct } from '../../store';
import CreateNewProductModal from './CreateNewProductModal.jsx';


const ProductManagementTab = () => {
  
  const dispatch = useDispatch();
  const products = useSelector(state => state.products)
  const categories = useSelector(state => state.categories)
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(()=>products)
  const [validationErrors, setValidationErrors] = useState({});
  const validateRequired = (value) => !!value.length
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const handleCreateNewRow = (values) => {
    dispatch(addProduct(values))
    setTableData([...tableData, values]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const product = {...values, id:row.original.id}
      tableData[row.index] = product
      dispatch(updateProduct(product))
      setTableData([...tableData]);
      exitEditingMode();
    }
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('productName')}`)
      ) {
        return;
      }
      dispatch(deleteProduct(row.original))
    },
    [tableData],
  );

  const columns = useMemo(
    ()=> [
      {
        accessorKey: 'categoryName',
        header: 'Category',
        size: 100,
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: 'productName',
        header: 'Product',
        size: 280,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      }
    ],
    [getCommonEditTextFieldProps],
  )

  return (
    <React.Fragment>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }} 
        columns={columns} 
        data={products}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits} 
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Product
          </Button>
        )}
        />
       <CreateNewProductModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        categories={categories}
      />
    </React.Fragment>
  )
}

export default ProductManagementTab

