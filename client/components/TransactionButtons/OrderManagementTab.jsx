import React, {useMemo, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialReactTable from 'material-react-table';
import { Box, ListItemIcon, Typography, MenuItem } from '@mui/material';
import { Delete, Send } from '@mui/icons-material';
import { deleteOrder } from '../../store';
import LineItem from '../ProductsAndTerminal/LineItem.jsx';


const OrderManagementTab = ({cashOpen, managerView, currentOrder, setCurrentOrder}) => {
  
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
        !confirm(`Are you sure you want to delete this order?`)
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
        enableEditing: false
      },
      {
        accessorKey: 'id',
        header: 'Order ID',
        size: 200,
        enableEditing: false
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
        enableColumnResizing
        enableEditing
        enableGrouping
        enableStickyFooter
        enableStickyHeader
        enableRowActions
        initialState={{
          density:'compact',
          grouping:['createdAt'],
          sorting:[{id:'createdAt', desc:false}]
        }}
        renderDetailPanel={({row}) => (
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:managerView ? '75%' : '100%'}}>
              <Typography sx={{width:'55%', fontWeight:'bold'}}>Product Name</Typography>
              <Typography sx={{width:'15%', fontWeight:'bold'}}>Quantity</Typography>
              <Typography sx={{width:'15%', fontWeight:'bold', textAlign:'right'}}>Tax Exempt Status</Typography>
              <Typography sx={{width:'10%', fontWeight:'bold', textAlign:'right', marginRight:'5px'}}>Subtotal</Typography>
            </Box>
            {row.original.lineItems.map((lineItem, idx) => <LineItem key={idx} idx={idx} cashOpen={cashOpen} managerView={managerView} productName={lineItem.productName} productPrice={lineItem.productPrice} quantity={lineItem.quantity} taxRate={lineItem.taxRate} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder}/> )}
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:managerView ? '75%' : '100%'}}>
              <Typography sx={{width:'55%', fontWeight:'bold'}}></Typography>
              <Typography sx={{width:'15%', fontWeight:'bold'}}></Typography>
              <Typography sx={{width:'15%', fontWeight:'bold', textAlign:'right'}}>Total</Typography>
              <Typography sx={{width:'10%', fontWeight:'bold', textAlign:'right', marginRight:'5px'}}>{Number(row.original.lineItems.reduce((acc, item) => { return acc + item.subtotal*1},0.00).toFixed(2)).toLocaleString('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2})}</Typography>
            </Box>
          </Box>
        )}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              dispatch(deleteOrder(row.original))
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete Order
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              setCurrentOrder(row.original)
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            Load Order
          </MenuItem>,
        ]}
        />
  )
}

export default OrderManagementTab

