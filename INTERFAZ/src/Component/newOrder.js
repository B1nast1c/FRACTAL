import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CancelIcon from "@mui/icons-material/Cancel";
import { Chip, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";

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

function Neworder() {
    const navigate = useNavigate();
    const random_number = Math.floor(Math.random() * 999) + 1
    let today = new Date().toLocaleDateString()

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
    
    const handleCreate = (customId, products, s_products) => {
        let objects = products.filter(product => s_products.includes(product.name))
        let order_products = objects.map(product  => ({
            orderId: customId,
            productId: product["id"],
          }))

        console.log("Order Products", order_products)
        const data = {
            id: customId,
            status: "Pending",
            products: order_products,
        }

        axios.post(baseUrl + 'order', { data: data })
        .then(
            data => {
                navigate("/my-orders")
                console.log(data)
            } 
        )
        .catch(err => console.log(err))
    }
    
    const handleDelete = (setS_Products, s_products, value) => {
        setS_Products(
            s_products.filter((item) => item !== value)
        )
        handleMClose()
    }
    
    useEffect(() => {
        axios.get(baseUrl + 'products')
        .then(
            res => setProducts(res.data)
        )
    }, [])

    return (
        <div style={{ height: 700, width: '100%' }}>
            <div style={{ height: 75, width: '100%', backgroundColor: '#282850' }} />
            <h1 style={{ width: '100%', textAlign: 'center' }}>Create Order</h1>
            <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <form onSubmit={handleCreate}>
                    <TextField
                        disabled
                        label="Order ID"
                        variant="outlined"
                        defaultValue={random_number} // Valor por defecto
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label="Order Number"
                        variant="outlined"
                        defaultValue={random_number} // Valor por defecto
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label="Date"
                        variant="outlined"
                        defaultValue={today} // Valor por defecto
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        disabled
                        label="Products Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={s_products.length}
                    />
                    <TextField
                        disabled
                        label="Final Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={products.filter(
                            product => s_products.includes(product.name))
                            .reduce(
                                (acumulador, product) => acumulador + product.price, 0)} //Solamente para la interfaz
                    />
                    <div style={{ 
                        marginTop: '15px'
                    }}/>
                    <Button variant="contained" color="warning" onClick={() => handleOpen()}>
                        Add Products
                    </Button>
                    <Modal
                            open={open}
                            onClose={handleClose} //Click afuera
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add Products
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <InputLabel>Select the products for the Order</InputLabel>
                            <div style={{ 
                                marginTop: '10px'
                            }}/>
                                <Select
                                    multiple
                                    value={s_products}
                                    onChange={(e) => setS_Products(e.target.value)}
                                    renderValue={(selected) => (
                                        <Stack gap={1} direction="row" flexWrap="wrap">
                                          {selected.map((value) => (
                                            <Chip
                                            key={value}
                                            label={value}
                                            onDelete={() => handleMOpen(setS_Products, s_products, value)}
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
                    <Button variant="contained" color="success" onClick={() => handleCreate(random_number, products, s_products)}>
                        Create Order
                    </Button>
                    </div>
                    
                </form>
            </div>
            
            <div style={{ height: 30, width: '100%', backgroundColor: '#282850', marginTop: '50px' }} />
        </div>
    )
}

export default Neworder