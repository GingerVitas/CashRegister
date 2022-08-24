import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialReactTable from 'material-react-table';
import { Box, Tooltip, IconButton, } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteOrder } from '../../store';


const OrderManagementTab = () => {
  
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders)
  const [tableData, setTableData] = useState(()=>orders)
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

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('productName')}`)
      ) {
        return;
      }
      dispatch(deleteOrder(row.original))
    },
    [tableData],
  );

  const columns = useMemo(
    ()=> [
      {
        accessorKey: 'createdAt',
        header: 'Order Date',
        size: 100,
      },
      {
        accessorKey: 'id',
        header: 'Order ID',
        size: 200,
      },
      {
        accessorKey: 'total',
        header: 'Order Total',
        size: 200,
        aggregationFn: 'sum',
        AggregatedCell: ({cell, table}) => (
          <>
            Sum by{' '}
            {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
            <Box sx={{color: 'success.main', fontWeight:'bold'}}>
              {Number(cell.getValue()?.toFixed(2)).toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
          </>
        ),
        Cell: ({cell}) => (
          <>
          {Number(cell.getValue()?.toFixed(2)).toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </>
        )
      }
    ],
    [getCommonEditTextFieldProps],
  )

  return (
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 50,
          },
        }} 
        columns={columns} 
        data={orders}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        enableGrouping
        enableStickyFooter
        enableStickyHeader
        initialState={{
          density:'compact',
          expanded:'false',
          grouping:['createdAt'],
          sorting:[{id:'createdAt', desc:false}]
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        />
  )
}

export default OrderManagementTab

