import { Box, Button, Chip, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import CancelIcon from "@mui/icons-material/Cancel";

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

function Editorder() {
    const location = useLocation()

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleMOpen = (setS_Products, s_products, value) => {
        setModalOpen(true);
        handleDelete(setS_Products, s_products, value)
    }
    const handleMClose = () => setModalOpen(false);
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [s_products, setS_Products] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Edit = () => {
        //Peticion Put
    }

    const handleEdit = (setS_Products, s_products, value) => {
        setS_Products(
            s_products.filter((item) => item !== value)
        )
        handleMClose()
    }

    const handleDelete = (setS_Products, s_products, value) => {
        setS_Products(
            s_products.filter((item) => item.name !== value.name)
        )
        handleMClose()
    }
    
    useEffect(() => {
        axios.get(baseUrl + 'products')
        .then(
            res => setProducts(res.data)
        )
        setS_Products(
            location.state.item.products.filter(item1 => products.some(item2 => item2.id === item1.id))
        )
    }, [])

    return (
        <div style={{ height: 700, width: '100%' }}>
            <div style={{ height: 75, width: '100%', backgroundColor: '#282850' }} />
            <h1 style={{ width: '100%', textAlign: 'center' }}>Edit Order</h1>
            <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <form onSubmit={handleEdit}>
                    <TextField
                        disabled
                        label="Order ID"
                        variant="outlined"
                        value={location.state.item.orderId} // Valor por defecto
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label="Order Number"
                        variant="outlined"
                        defaultValue={location.state.item.orderNumber} // Valor por defecto
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label="Date"
                        variant="outlined"
                        defaultValue={location.state.item.date} // Valor por defecto
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label="Products Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={s_products.length} // Valor por defecto
                    />
                    <TextField
                        disabled
                        label="Final Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={s_products.reduce((total, element) => total + element.price, 0)}
                    />
                    <div style={{ 
                        marginTop: '25px'
                    }}/>
                    <Button variant="contained" color="warning" onClick={() => handleOpen()}>
                        Modify Products
                    </Button>
                    <Modal
                            open={open}
                            onClose={handleClose} //Click afuera
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Modify Products
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <InputLabel>Select the products for the Order</InputLabel>
                            <div style={{ 
                                marginTop: '10px'
                            }}/>
                                <Select
                                    multiple
                                    value={s_products}
                                    onChange={(e) => handleEdit(setS_Products, s_products, e.target.value)}
                                    renderValue={(selected) => (
                                        <Stack gap={1} direction="row" flexWrap="wrap">
                                          {selected.map((value) => (
                                            <Chip
                                            key={value.id}
                                            label={value.name}
                                            onDelete={() => handleEdit(setS_Products, s_products, value)}
                                            deleteIcon={
                                              <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                              />
                                            }
                                          />
                                          ))}
                                        </Stack>
                                      )}
                                >
                                    {products.map((product) => (
                                    <MenuItem key={product.id} value={product.name}>
                                        {product.name}
                                    </MenuItem>
                                    ))}
                                    <Modal
                                        open={modalOpen}
                                        onClose={handleMClose}
                                        aria-labelledby="modal-title"
                                        aria-describedby="modal-description"
                                    >
                                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
                                        <Typography id="modal-title" variant="h6" component="h2">
                                            Delete Product?
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                        </Box>
                                    </Modal>
                                </Select>
                            </Typography>
                            <div style={{ 
                                marginTop: '20px'
                            }}/>
                                <Button variant="contained" color="success" onClick={handleClose}>
                                    Done
                                </Button>
                            </Box>
                    </Modal>

                    <div style={{ 
                        marginTop: '20px'
                    }}>
                    <Button variant="contained" color="success" onClick={() => Edit()}>
                        Edit Order
                    </Button>
                    </div>
                    
                </form>
            </div>
            <div style={{ height: 30, width: '100%', backgroundColor: '#282850', marginTop: '40px' }} />
        </div>
    )
}

export default Editorder