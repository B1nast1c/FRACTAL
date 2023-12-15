import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = 'http://localhost:5000/fractal/'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function Orders() {
    let history = useNavigate();
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    
    const handleEdit = (e, item) => {
        console.log(item)
        
        history("/add-order/:id", 
            {state: {item: item}}
        )
    };

    const handleDelete = (e, item) => {
        const dataToDelete = { id: item.orderId }
        axios.delete(baseUrl + 'order', { data: dataToDelete})
        .then(res => window.location.reload(false))
        .catch(err => console.log(err))
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get(baseUrl + 'orders')
        .then(
            res => setData(res.data)
        )
    }, [])

    const columns = [
        { field: 'orderId', headerName: 'ID', flex: 1, },
        { field: 'orderNumber', headerName: 'Order Nº', flex: 1, },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'quantity', headerName: 'Products Nº', flex: 1, },
        { field: 'total', headerName: 'Final Price', flex: 1, },
        { field: 'status', headerName: 'Status', flex: 1},
        { field: 'options',
            headerName: 'Options',
            renderCell: (params) => {
                return (
                    <div>
                        <Button
                            style={{backgroundColor: '#ba000d', color: '#FFFFFF'}}
                            onClick={(e) => handleOpen()}
                            variant="contained"
                        >
                            Delete
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose} //Click afuera
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure to delete this order?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button
                                style={{backgroundColor: '#ba000d', color: '#FFFFFF'}}
                                onClick={(e) => handleDelete(e, params.row)}
                                variant="contained"
                            >
                                Yes, I'm sure
                            </Button>
                            </Typography>
                            </Box>
                        </Modal>
                        <Button
                            style={{backgroundColor: '#002884', color: '#FFFFFF'}}
                            onClick={(e) => handleEdit(e, params.row)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </div>
                  
                );
              },
              flex: 1
        }
    ]

    return (
        <div style={{ height: 700, width: '100%' }}>
            <div style={{ height: 75, width: '100%', backgroundColor: '#282850' }} />
            <h1 style={{ width: '100%', textAlign: 'center' }}>My Orders</h1>
            <div style={{ marginLeft: '50px' }}>
                <Button>
                    <Link style={{ textDecoration: 'none', fontWeight: 'bold' }} to="/add-order/">Add new Order</Link>
                </Button>
            </div>
            <DataGrid
                style={{ paddingLeft: '50px', paddingRight: '50px', textAlign: 'center' }}
                rows={data}
                columns={columns}
                pageSize={10}
                getRowId={(row) => row.orderId}
            />
            <div style={{ height: 50, width: '100%', backgroundColor: '#282850' }} />
        </div>
    )
}

export default Orders